import {ApiProperty} from '@nestjs/swagger'
import { TimeInterval } from 'rxjs';

export class CreateUser{
    @ApiProperty()
    name: string;

    @ApiProperty()
    type_user: string;
}

export class CreateStaff{
    @ApiProperty()
    problems_solved_count: number;
    @ApiProperty()
    mean_time_on_channel: Date;
    @ApiProperty()
    mean_avaliantion_score: number
}