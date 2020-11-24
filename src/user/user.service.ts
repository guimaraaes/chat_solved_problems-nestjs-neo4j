import { Injectable, Res, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUser } from './dto/user.dto';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class UserService {
    constructor(
        private neo4jService: Neo4jService
    ) { }

    async create(user: CreateUser, type: string) {
        const foundusers = await this.neo4jService.read(`
            MERGE (u:User {name: $u.name, type: $type})
            WITH u
            CALL apoc.create.addLabels( (u), [ u.type ] )
            YIELD node
            RETURN  u,
                    u.name as name
        `, { u: user, type: type }).then(res => {
            const users = res.records.map(row => {
                return new User(
                    row.get('u'),
                    row.get('name'),
                    null
                )
            })
            return users.map(a => a)
        })
        return foundusers
    }

    async findById(id: number): Promise<User[]> {
        const foundusers = await this.neo4jService.read(`
            MATCH (u:User) WHERE id(u) = toInteger($id)
            RETURN  u,
                    u.name as name,
                    u.type_user as type_user
        `, { id: id }).then(res => {
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
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return foundusers
    }

}
