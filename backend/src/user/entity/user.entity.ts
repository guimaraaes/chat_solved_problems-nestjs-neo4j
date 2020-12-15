import { Node } from 'neo4j-driver'

export class User {
    constructor(
        private readonly user: Node,
        private readonly name: string,
        // private readonly username: string,
        // private readonly password: string,
        private readonly type_user: string
    ) { }
    toJson(): Record<string, any> {
        return {
            ...this.user.properties,
            name: this.name,
            // username: this.username,
            // password: this.password,
            type_user: this.type_user,
        }
    }
}


export class Staff {
    constructor(
        private readonly staff: Node,
        private readonly problems_solved_count: number,
        private readonly mean_time_on_channel: string,
        private readonly mean_avaliantion_score: string
    ) { }
    toJson(): Record<string, any> {
        return {
            ...this.staff.properties,
            problems_solved_count: this.problems_solved_count,
            mean_time_on_channel: this.mean_time_on_channel,
            mean_avaliantion_score: this.mean_avaliantion_score,
        }
    }
}

export class Client {
    constructor(
        private readonly client: Node,
        private readonly quantity_problems: number,
        private readonly problems_solved: number,
        private readonly avaliantion_mean: number
    ) { }
    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
            quantity_problems: this.quantity_problems,
            problems_solved: this.problems_solved,
            avaliantion_mean: this.avaliantion_mean,
        }
    }
}