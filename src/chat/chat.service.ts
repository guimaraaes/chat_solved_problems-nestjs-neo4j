import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { ChatMessage } from './dto/chat.dto';
import { Neo4jService } from 'nest-neo4j';
import { Message } from './entity/chat.entity';
import { UserService } from 'src/user/user.service';
import { isNumber } from 'util';
import { async } from 'rxjs';
import { type } from 'os';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ChatService {
    constructor(
        private readonly gateway: AppGateway,
        private readonly neo4jService: Neo4jService,
        private readonly userService: UserService,
    ) { }

    private async existUsers(id_users: number[]): Promise<boolean> {
        return await this.neo4jService.read(`
        MATCH (u:User) WHERE id(u) IN $ids
        RETURN  count(u) AS count_user,
                size($ids) AS count_ids
        `, { ids: id_users }).then(res => {
            return (res.records[0].get('count_ids').low == res.records[0].get('count_user').low)
        })
    }

    async sendMessage(chatMessage: ChatMessage) {
        var id_users = []
        chatMessage.id_users_on_chat.forEach((i) => {
            id_users.push(Number(i))
        })

        var exist_users = await this.existUsers(id_users)
        if (!exist_users)
            throw new HttpException('Some user not found', HttpStatus.NOT_FOUND);

        var wssCanal = ''
        chatMessage.id_users_on_chat.map((value) => {
            wssCanal = wssCanal + '&id_users=' + value
        })
        wssCanal = "?" + wssCanal.slice(1,)

        id_users.forEach((value) => {
            this.neo4jService.write(`
                MATCH (c:Chat) WHERE size(c.id_user) = size($ids) and ALL (x IN c.id_user WHERE (x) in $ids)
                WITH count(c) as i
                CALL apoc.do.when(
                    i > 0 ,
                    'MATCH (cr:Chat) WHERE size(cr.id_user) = size(ids) and  ALL ( x IN cr.id_user WHERE (x) in ids) MATCH (u:User) WHERE id(u) = (id) MERGE (cr)<-[:IS_ON]-(u) RETURN cr',
                    'MERGE (cr:Chat {id_user: ids}) WITH cr MATCH (u:User) WHERE id(u) = ($id) WITH cr, u MERGE (cr)<-[:IS_ON]-(u) RETURN cr',
                    {id: $id, ids:$ids}
                    )
                YIELD value
                RETURN value.resultNodes as resultNodes
            `, {
                id: value,
                ids: chatMessage.id_users_on_chat
            })
        });

        return await this.neo4jService.write(`
            MATCH (c:Chat) WHERE size(c.id_user) = size($ids) and ALL (x IN c.id_user WHERE (x) in $ids)
            MATCH (u:User) WHERE id(u) = toInteger($id)
            CREATE (u)<-[:SEND_BY]-(m:Message {name_user: u.name, message: $message, date: $date})<-[r:RELATIONSHIP]-(c)
                    
            WITH r,m 
            CALL apoc.refactor.setType(r, $date)
            YIELD input, output
            RETURN  m,
                    m.name_user as name_user,
                    m.message as message,
                    m.date as date
        `, {
            id: chatMessage.id_user_send_message,
            ids: chatMessage.id_users_on_chat,
            message: chatMessage.message_content.message,
            date: chatMessage.message_content.date
        }).then(res => {
            const users = res.records.map(row => {
                this.gateway.wss.emit(wssCanal, {
                    name_user: row.get('name_user'),
                    message: row.get('message'),
                    date: row.get('date')
                })
                return new Message(
                    row.get('name_user'),
                    row.get('message'),
                    row.get('date')
                )
            })

            return users.map(a => a)
        })
    }



    async findByIdUsers(ids: number[]) {
        var id_users = []
        ids.forEach((i) => {
            id_users.push(Number(i))
        })

        var exist_users = await this.existUsers(id_users)
        if (!exist_users)
            throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);

        const foundusers = await this.neo4jService.read(`
            MATCH (c:Chat) WHERE size(c.id_user) = size($ids) AND ALL (x IN c.id_user WHERE x IN $ids)
            WITH c
            MATCH (c)-[]->(m:Message) 
            RETURN  m,
                    m.name_user AS name_user,
                    m.message AS message,
                    m.date AS date
        `, { ids: id_users }).then(res => {
            const users = res.records.map(row => {
                const chatMessage = new Message(
                    row.get('name_user'),
                    row.get('message'),
                    row.get('date')
                )
                return chatMessage
            })
            return users.map(a => a)
        })
        return foundusers
    }
}
