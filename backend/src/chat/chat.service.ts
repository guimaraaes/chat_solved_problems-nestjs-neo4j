import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { ChatMessage, EditChat } from './dto/chat.dto';
import { Neo4jService } from 'nest-neo4j';
import { Message } from './entity/chat.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class ChatService {
    constructor(
        private readonly gateway: AppGateway,
        private readonly neo4jService: Neo4jService,
    ) { }

    private async existUsers(id_users: number[]): Promise<boolean> {
        return await this.neo4jService.read(`
            MATCH (u:User) WHERE id(u) IN $ids
            RETURN  count(u) AS count_user,
                    size($ids) AS count_ids
        `, { ids: id_users })
            .then(res => {
                return (res.records[0].get('count_ids').low == res.records[0].get('count_user').low)
            })
    }

    async findByIdUsers(ids: number[]) {
        var id_users = []
        ids.forEach((i) => {
            id_users.push(Number(i))
        })

        var exist_users = await this.existUsers(id_users)
        // return exist_users
        if (!exist_users)
            throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);

        return await this.neo4jService.read(`
            MATCH (c:Chat) WHERE size(c.id_user) = size($ids) AND ALL (x IN c.id_user WHERE x IN $ids)
            WITH c
            MATCH (c)-[]->(m:Message)-[:SEND_BY]->(u)
            RETURN  id(c) as id_chat,
                    m,
                    m.name_user AS name_user,
                    m.message AS message,
                    m.date AS date,
                    id(u) AS id_user
                    ORDER BY date
        `, { ids: id_users }).then(res => {
            const users = res.records.map(row => {
                // const chatMessage = new Message(
                //     row.get('name_user'),
                //     row.get('message'),
                //     row.get('date')
                // )
                return {
                    id_chat: Number(row.get('id_chat')),
                    name_user: row.get('name_user'),
                    message: row.get('message'),
                    date: row.get('date'),
                    id_user: Number(row.get('id_user'))
                }
            })

            if (res.records.length > 0)
                return users.map(a => a)
            throw new NotFoundException('no chat found by ids users')
        })
    }

    async sendMessage(chatMessage: ChatMessage) {
        var id_users = []
        chatMessage.id_users_on_chat.forEach((i) => {
            id_users.push(Number(i))
        })

        var exist_users = await this.existUsers(id_users)
        if (!exist_users)
            throw new NotFoundException('Some user not found');

        var wsChannel = []
        chatMessage.id_users_on_chat.map((value) => {
            wsChannel.push(value)
        })
        wsChannel = wsChannel.sort()
        // return wssCanal

        // id_users.forEach((value) => {
        //     this.neo4jService.write(`
        //         MATCH (c:Chat) WHERE size(c.id_user) = size($ids) AND ALL (x IN c.id_user WHERE x IN $ids)
        //         WITH count(c) as i
        //         CALL apoc.do.when(
        //             i > 0 ,
        //             'MATCH (cr:Chat) WHERE size(cr.id_user) = size(ids) AND  ALL ( x IN cr.id_user WHERE x IN ids) MATCH (u:User) WHERE id(u) = (id) MERGE (cr)<-[:IS_ON]-(u) RETURN cr',
        //             'MERGE (cr:Chat {id_user: ids}) WITH cr MATCH (u:User) WHERE id(u) = ($id) WITH cr, u MERGE (cr)<-[:IS_ON]-(u) RETURN cr',
        //             {id: $id, ids:$ids}
        //             )
        //         YIELD value
        //         RETURN value.resultNodes as resultNodes
        //     `, {
        //         id: value,
        //         ids: chatMessage.id_users_on_chat
        //     })
        // });

        return await this.neo4jService.write(`
            MATCH (c:Chat) WHERE size(c.id_user) = size($ids) AND ALL (x IN c.id_user WHERE x IN $ids)
            MATCH (u:User) WHERE id(u) = toInteger($id)
            CREATE (u)<-[:SEND_BY]-(m:Message {name_user: u.name, message: $message, date: $date})<-[r:RELATIONSHIP]-(c)
                    
            WITH r,m, u
            CALL apoc.refactor.setType(r, $date)
            YIELD input, output
            RETURN  m,
                    m.name_user AS name_user,
                    m.message AS message,
                    m.date AS date,
                    id(u) AS id_user
        `, {
            id: chatMessage.id_user_send_message,
            ids: chatMessage.id_users_on_chat,
            message: chatMessage.message_content.message,
            date: chatMessage.message_content.date
        }).then(res => {
            const users = res.records.map(row => {
                this.gateway.wss.emit(wsChannel, {
                    name_user: row.get('name_user'),
                    message: row.get('message'),
                    date: row.get('date'),
                    id_user: Number(row.get('id_user'))
                })
                const message = new Message(
                    row.get('name_user'),
                    row.get('message'),
                    row.get('date')
                )
                return { message, id_user: Number(row.get('id_user')) }
            })
            if (res.records.length > 0)
                return users.map(a => a)
            throw new BadRequestException('error on send message')
        })
    }

    async editChatRemove(id_chat: number, id_user: number) {
        return await this.neo4jService.read(`
                MATCH (c:Chat) WHERE id(c) = toInteger($id_chat)
                    SET c.id_user = apoc.coll.removeAll(c.id_user, [$id_user])
                WITH c
                MATCH  (u:User)-[r:IS_ON]->(c) WHERE id(u) = $id_user
                    DELETE r
                RETURN c  
        `, {
            id_chat: id_chat,
            id_user: Number(id_user)
        }).then(res => {
            if (res.records.length > 0)
                return res.records[0].get('c')
            throw new NotFoundException('no user found by ids users or internal error on remove')
        })
    }

    async editChatAdd(id_chat: number, id_user: number) {
        return await this.neo4jService.read(`
            MATCH (c:Chat) WHERE id(c) = toInteger($id_chat)
                SET c.id_user = apoc.coll.union(c.id_user, [$id_user])
            WITH c
            MATCH (u:User) WHERE id(u) = $id_user
            WITH c, u
            CREATE  (u)-[:IS_ON]->(c) 
            RETURN c  
        `, {
            id_chat: id_chat,
            id_user: Number(id_user)
        }).then(res => {
            if (res.records.length > 0)
                return res.records[0].get('c')
            throw new NotFoundException('no user found by ids users or internal error on add')
        })
    }
}
