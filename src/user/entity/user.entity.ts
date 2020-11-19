import { Node } from 'neo4j-driver'

export class User{
    constructor(
        private readonly user: Node,
        private readonly name: string,
        private readonly type_user: string,
        private readonly message: string
    ) {}
}