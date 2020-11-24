import { ApiProperty } from '@nestjs/swagger'

export class CreateUser {
    @ApiProperty()
    name: string;
    @ApiProperty()
    type_user: string;
}

export class Staff {
    problems_solved_count: number;
    mean_time_on_channel: Date;
    mean_avaliantion_score: number;
}

export class Client {
    quantity_problems: number;
    problems_solved: number;
    avaliantion_mean: number;
}