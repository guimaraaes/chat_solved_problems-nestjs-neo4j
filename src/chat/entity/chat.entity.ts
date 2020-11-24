
import { Node } from 'neo4j-driver'

export class Chat {
    constructor(
        private readonly chat: Node,
        private readonly id_users: number[],
        private readonly description: string,
        private readonly date_open: Date
    ) { }
    toJson(): Record<string, any> {
        return {
            ...this.chat.properties,
            id_users: this.id_users,
            description: this.description,
            date_open: this.date_open,
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}


export class Message {
    constructor(
        private readonly name_user: string,
        private readonly message: string,
        private readonly date: Date,
    ) { }
    toJson(): Record<string, any> {
        return {
            name_user: this.name_user,
            message: this.message,
            date: this.date,
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}