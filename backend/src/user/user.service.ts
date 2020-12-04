import { Injectable, Res, HttpStatus, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUser } from './dto/user.dto';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class UserService {
    constructor(
        private neo4jService: Neo4jService
    ) { }

    async findAllClients() {
        return await this.neo4jService.read(`
            MATCH (u:Client) 
            OPTIONAL MATCH (u)-[hasp:HAS_PROBLEM]->(:Problem)
            OPTIONAL MATCH (u)-[hasps:HAS_PROBLEM]->(:Solved)
            RETURN u.name as client_name, 
                count(hasp) as countProb,
                count(hasps) as countProbSolv 
        `).then(res => {
            const clients = res.records.map(row => {
                return {
                    client_name: row.get('client_name'),
                    countProb: row.get('countProb').low,
                    countProbSolv: row.get('countProbSolv').low
                }
            })
            if (res.records.length > 0)
                return clients
            throw new NotFoundException('user not found')
        })
    }


    async findAllStaffs() {
        return await this.neo4jService.read(`
            MATCH  (s:Staff)
            OPTIONAL MATCH(s)-[sol:SOLVED]->() 
            RETURN s.name as staff_name,
                count(sol) as countSolv
        `).then(res => {
            const staffs = res.records.map(row => {
                return {
                    staff_name: row.get('staff_name'),
                    countSolv: row.get('countSolv').low
                }
            })
            if (res.records.length > 0)
                return staffs
            throw new NotFoundException('user not found')
        })
    }

    async findById(id: number): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (u:User) WHERE id(u) = toInteger($id)
            RETURN  u,
                    u.name as name,
                    u.type as type_user
        `, { id: id }).then(res => {
            const users = res.records.map(row => {
                return new User(
                    row.get('u'),
                    // null,
                    row.get('name'),
                    row.get('type_user')
                )
            })
            if (res.records.length > 0)
                return users
            throw new NotFoundException('user not found')
        })
    }

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
            if (res.records.length > 0)
                return users.map(a => a)
            throw new BadRequestException('error on create user')
        })
    }


}
