
import { Node } from 'neo4j-driver'

export class User{
    constructor(
        private readonly chat: Node,
        private readonly message: string
    ) {}
}