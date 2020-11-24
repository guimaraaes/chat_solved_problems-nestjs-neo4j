import { Injectable, HttpException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Problem } from './dto/problem.dto';
import { ChatMessage } from 'src/chat/dto/chat.dto';
import { ChatService } from 'src/chat/chat.service';
import { AppGateway } from 'src/app.gateway';
import { Message } from 'src/chat/entity/chat.entity';

@Injectable()
export class ProblemService {

    constructor(
        private readonly gateway: AppGateway,

        private readonly neo4jService: Neo4jService,
        private readonly chatService: ChatService
    ) { }


    async findByIdClient(id: number) {

    }


    async findByIdStaff(id: number) {

    }

    async create(problem: Problem) {
        // return problem.id_client
        var chatMessage: ChatMessage = {
            id_user_send_message: problem.id_client,
            id_users_on_chat: [problem.id_client, 15, 96],
            message_content: problem.description,
        }


        // return chatMessage
        var id_users = []
        chatMessage.id_users_on_chat.forEach((i) => {
            id_users.push(Number(i))
        })

        var wssCanal = ''
        chatMessage.id_users_on_chat.map((value) => {
            wssCanal = wssCanal + '&id_users=' + value
        })
        wssCanal = "?" + wssCanal.slice(1,)

        id_users.forEach((value) => {
            this.neo4jService.write(`
                MATCH (c:Chat) WHERE size(c.id_user) = size($ids) AND ALL (x IN c.id_user WHERE x IN $ids)
                WITH count(c) as i
                CALL apoc.do.when(
                    i > 0 ,
                    'MATCH (cr:Chat) WHERE size(cr.id_user) = size(ids) AND  ALL ( x IN cr.id_user WHERE x IN ids) MATCH (u:User) WHERE id(u) = (id) MERGE (cr)<-[:IS_ON]-(u) RETURN cr',
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


        await this.neo4jService.write(`
            MATCH (c:User) WHERE id(c) = $id_client
            WITH c
            CREATE (p:Problem {type: $p.type, description: $p.description.message})<-[:HAS_PROBLEM]-(c)

            RETURN p, c
        `, {
            id_client: chatMessage.id_user_send_message,
            p: problem
        })

        return await this.neo4jService.write(`
            MATCH (c:Chat) WHERE size(c.id_user) = size($ids) AND ALL (x IN c.id_user WHERE x IN $ids)
            MATCH (u:User) WHERE id(u) = toInteger($id)
            CREATE (u)<-[:SEND_BY]-(m:Message {name_user: u.name, message: $message, date: $date})<-[r:RELATIONSHIP]-(c)
                    
            WITH r,m 
            CALL apoc.refactor.setType(r, $date)
            YIELD input, output
            RETURN  m,
                    m.name_user AS name_user,
                    m.message AS message,
                    m.date AS date
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

    async solved(id: number) {

    }
}
