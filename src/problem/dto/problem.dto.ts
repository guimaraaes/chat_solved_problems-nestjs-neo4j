import { ApiProperty } from "@nestjs/swagger";
import { MessageContent } from "src/chat/dto/chat.dto";

export class Problem {
    @ApiProperty()
    type: string;
    @ApiProperty()
    id_client: number;
    @ApiProperty({ type: 'array', items: { type: 'number' } })
    id_staff: number[];
    @ApiProperty()
    description: MessageContent;
    time_to_solve: TimeRanges;
}