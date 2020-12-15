import { Injectable, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentials } from './dto/auth.dto';
import { User } from 'src/user/entity/user.entity';
import { CreateUser } from 'src/user/dto/user.dto';
import { Neo4jService } from 'nest-neo4j';
import * as bycript from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly jwtService: JwtService,
    ) { }


    async singUp(authCredentials: AuthCredentials, type: string) {
        const { username, password } = authCredentials;



        const user = new CreateUser();
        user.username = username;
        user.salt = await bycript.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        const res = await this.findOne(username);
        if (res)
            throw new ConflictException('email aready exists')


        var propertiesDefault
        if (type == 'Client') {
            propertiesDefault = 'quantity_problems: 0,  problems_solved: 0, avaliantion_mean: 0'

        } else {
            propertiesDefault = 'problems_solved_count: 0,  mean_avaliantion_score: 0 '

        }
        return await this.neo4jService.read(`
            MERGE (u:User {name: $u.name, 
                            username: $u.username, 
                            password: $u.password,
                            type: $type, 
                            `+ propertiesDefault + `})
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

    async findOne(username: string): Promise<CreateUser> {
        return await this.neo4jService.read(`
            MATCH (u:User { username: $username})
            RETURN u.username as username,
                    u.password as password 
        `, { username: username }).then(
            res => {
                const user = new CreateUser
                user.username = res.records[0].get('username')
                user.password = res.records[0].get('password')
                return null
            }
        )
    }
    async validateUserPassword(credentials: AuthCredentials): Promise<any> {
        const { username, password } = credentials;
        const user = await (this.findOne(username))

        if (user && await user.validPassword(password))
            return user.username
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bycript.hash(password, salt);
    }

    async singIn(credentials: AuthCredentials): Promise<{ acessToken: string }> {
        const username = await this.validateUserPassword(credentials)
        if (!username) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayload = { username }
        const acessToken = await this.jwtService.sign(payload);
        return { acessToken }
    }



}
