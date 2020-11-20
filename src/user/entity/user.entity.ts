import { Node } from 'neo4j-driver'

export class User{
    constructor(
        private readonly user: Node,
        private readonly name: string,
        private readonly type_user: string
    ) {}
    toJson(): Record<string, any> {
        return {
            ...this.user.properties,
            name: this.name,
            type_user: this.type_user,
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}