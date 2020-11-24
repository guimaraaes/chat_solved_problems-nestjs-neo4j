import { ApiProperty } from "@nestjs/swagger";

export class Problem {
    @ApiProperty()
    type: string;
    time_to_solve: TimeRanges;
    solution: boolean;
}