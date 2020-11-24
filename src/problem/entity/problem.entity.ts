import { Node } from 'neo4j-driver'

export class Problem {
    constructor(
        private readonly problem: Node,
        private readonly type: string,
        private readonly time_to_solve: TimeRanges,
        private readonly solution: boolean,
    ) { }
    toJson(): Record<string, any> {
        return {
            ...this.problem.properties,
            type: this.type,
            time_to_solve: this.time_to_solve,
            solution: this.solution,
        }
    }
} 