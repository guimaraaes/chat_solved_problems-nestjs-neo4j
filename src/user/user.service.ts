import { Injectable } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { User } from './entity/user.entity';
import { CreateUser } from './dto/user.dto';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class UserService {
    constructor( 
        private gateway: AppGateway,
        private neo4jService: Neo4jService
    ){}

    async create(user: CreateUser){
        const foundusers =  await this.neo4jService.read(`
            MERGE (u:User {name: $u.name, type_user: $u.type_user})
            RETURN  u,
                    u.name as name,
                    u.type_user as type_user
        `, {u: user}).then(res => {
            const users = res.records.map(row => {
                return new User(
                    row.get('u'),
                    row.get('name'),
                    row.get('type_user')
                )
            })
            return users.map(a => a)
        })
      
        return foundusers
    }

    async findById(id: number){
        const foundusers =  await this.neo4jService.read(`
            MATCH (u:User) WHERE id(u) = toInteger($id)
            RETURN  u,
                    u.name as name,
                    u.type_user as type_user

        `, {id: id}).then(res => {
            const users = res.records.map(row => {
                return new User(
                    row.get('u'),
                    row.get('name'),
                    row.get('type_user')
                )
            })
            return users.map(a => a)
        })
        if (foundusers.length == 0)
            return {message: 'none user'}
        return foundusers
    }

}
