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
        var propertiesDefault
        if (type == 'Client') {
            propertiesDefault = 'quantity_problems: 0,  problems_solved: 0, avaliantion_mean: 0'

        } else {
            propertiesDefault = 'problems_solved_count: 0,  mean_avaliantion_score: 0 '

        }
        return await this.neo4jService.read(`
            MERGE (u:User {name: $u.name, type: $type, `+ propertiesDefault + `})
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
