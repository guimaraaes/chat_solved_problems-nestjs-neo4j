import { Injectable } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { ChatMessage } from './dto/chat.dto';
import { Neo4jService } from 'nest-neo4j';
import { Chat } from './entity/chat.entity';
import { Message } from './entity/chat.entity';

@Injectable()
export class ChatService {
    constructor( 
        private gateway: AppGateway,
        private neo4jService: Neo4jService
    ){}

    async sendMessage(chatMessage: ChatMessage){

        //verificar se usuários existem 

        
        
         // CRIAR CHAT SE NÃO EXISTIR
         const m = chatMessage.id_users_on_chat
         m.forEach( async (value) => { 
             await this.neo4jService.write(`
                MATCH (c:Chat) WHERE ALL ( x IN c.id_user WHERE toInteger(x) in $ids )
                WITH count(c) as i
                CALL apoc.do.when(
                    i > 0 ,
                    'MATCH (c:Chat) WHERE ALL ( x IN c.id_user WHERE toInteger(x) in $ids) MATCH (u:User) WHERE id(u) = toInteger(id) MERGE (c)<-[:IS_ON]-(u) RETURN c',
                    'CREATE (cr:Chat {id_user: $ids}) WITH cr MATCH (u:User) WHERE id(u) = toInteger($id) MERGE (cr)<-[:IS_ON]-(u) RETURN cr',
                    {id: $id, ids:$ids}
                    )
                YIELD value
                RETURN value.resultNodes as resultNodes
            `, {id: value,
                ids: chatMessage.id_users_on_chat})
        });

        return await this.neo4jService.write(`
            MATCH (c:Chat) WHERE ALL ( x IN c.id_user WHERE toInteger(x) in $ids)
            MATCH (u:User) WHERE id(u) = toInteger($id)
            CREATE (u)<-[:SEND_BY]-(m:Message {name_user: $name_user, message: $message, date: $date})<-[r:RELATIONSHIP]-(c)
                    
            WITH r,m 
            CALL apoc.refactor.setType(r, $date)
            YIELD input, output
            RETURN  m,
                    m.name_user as name_user,
                    m.message as message,
                    m.date as date
        `,{ id: chatMessage.id_user_send_message,
            ids: chatMessage.id_users_on_chat, 
            name_user: chatMessage.message_content.name_user,
            message: chatMessage.message_content.message,
            date: chatMessage.message_content.date
        })
        .then(res => {
            const users = res.records.map(row => {
                return new Message(
                    row.get('name_user'),
                    row.get('message'),
                    row.get('date')
                )
            })
            this.gateway.wss.emit('newMessage', chatMessage.message_content)
            return users.map(a => a)
        })
    }

    async findByIdUsers(ids: number[]): Promise<any>{
        //verificar se chat existe existem 

        const foundusers =  await this.neo4jService.read(`
            MATCH (c:Chat) WHERE ALL ( x IN c.id_user WHERE toInteger(x) in $ids )
            WITH c
            MATCH (c)-[]->(m:Message) 
            RETURN  m,
                    m.name_user as name_user,
                    m.message as message,
                    m.date as date
        `,{ids: ids}).then(res => {
            const users = res.records.map(row => {
                const chatMessage = new Message(
                    row.get('name_user'),
                    row.get('message'),
                    row.get('date')
                )
                this.gateway.wss.emit('newMessage', chatMessage)
                return chatMessage
            })
            return users.map(a => a)
        })
        return foundusers
    }
}
