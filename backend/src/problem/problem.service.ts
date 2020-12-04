import { Injectable, NotFoundException, HttpException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Problem } from './dto/problem.dto';
import { ChatMessage } from 'src/chat/dto/chat.dto';
import { AppGateway } from 'src/app.gateway';
import { Message } from 'src/chat/entity/chat.entity';

@Injectable()
export class ProblemService {
    constructor(
        private readonly gateway: AppGateway,
        private readonly neo4jService: Neo4jService,
    ) { }


    async findByIdClient(id: number) {
        return this.neo4jService.read(`
                MATCH (p:Problem)<-[:HAS_PROBLEM]-(c:Client) 
                    WHERE id(c) = toInteger($id_client)
                RETURN p.description as description,
                p.type as type
            `,
            { id_client: id })
            .then(res => {
                const problems = res.records.map(row => {
                    return {
                        description: row.get('description'),
                        type: row.get('type')
                    }
                })

                if (res.records.length > 0)
                    return problems.map(a => a)
                throw new NotFoundException('no problem found by id client')

            })
    }


    async findByIdStaff(id: number) {
        return this.neo4jService.read(`
            MATCH (p:Problem)<-[:SOLVED]-(s:Staff) 
                WHERE id(s) = toInteger($id_staff)
            RETURN p
        `,
            { id_staff: id })
            .then(res => {
                if (res.records.length > 0)
                    return res.records[0]
                throw new NotFoundException('no problem found by id staff')
            })
    }

    async create(problem: Problem) {
        var chatMessage: ChatMessage = {
            id_user_send_message: problem.id_client,
            id_users_on_chat: problem.id_staff.concat(problem.id_client),
            message_content: problem.description,
        }

        var id_users = []
        chatMessage.id_users_on_chat.forEach((i) => {
            id_users.push(Number(i))
        })

        // return id_users
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
                SET c.problems_solved =  c.problems_solved + 1
            WITH c 
            CREATE (p:Problem {type: $p.type, description: $p.description.message})<-[:HAS_PROBLEM { type: $p.type, time_to_solve: $time_to_solve }]-(c)
            RETURN p, c
        `, {
            id_client: chatMessage.id_user_send_message,
            p: problem,
            time_to_solve: 'DEFAULD'
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

            var wssCanal = ''
            chatMessage.id_users_on_chat.map((value) => {
                wssCanal = wssCanal + '&id_users=' + value
            })
            wssCanal = "?" + wssCanal.slice(1,)

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
            if (res.records.length > 0)
                return users.map(a => a)
            throw new BadRequestException('error on create problem')
        })
    }

    async solved(id: number, id_staff: number, avaliantion: number) {
        return await this.neo4jService.write(`
            MATCH (p:Problem) WHERE id(p) = toInteger($id_problem)
                SET p:Resolved, p.time_to_solve = $time_to_solve
            WITH p
            MATCH (s:Staff) WHERE id(s) = toInteger($id_staff)
                SET s.problems_solved_count = s.problems_solved_count + 1, 
                s.mean_time_on_channel = $mean_time_on_channel,
                s.mean_avaliantion_score = (s.mean_avaliantion_score + toInteger($avaliantion))/2 
            WITH s, p
            MERGE (s)-[:SOLVED {type: p.type, mean_time_to_solve: $mean_time_to_solve}]->(p)
            WITH s, p
            MATCH (p)<-[:HAS_PROBLEM]-(c:Client)-[:IS_ON]->(C:Chat)<-[r:IS_ON]-(s)
                SET c.problems_solved = c.problems_solved +  1, 
                    c.avaliantion_mean = (c.avaliantion_mean + toInteger($avaliantion))/2 
                DELETE r
            RETURN p
        `,
            {
                id_problem: id,
                id_staff: id_staff,
                time_to_solve: 'DEFAULD_UPDATED',
                mean_time_to_solve: 'DEFAULT',
                mean_time_on_channel: 'DEFAULT',
                avaliantion: avaliantion
            })
            .then(res => {
                if (res.records.length > 0)
                    return res.records[0]
                throw new BadRequestException('error on edit problem to solved')
            })

    }
}
