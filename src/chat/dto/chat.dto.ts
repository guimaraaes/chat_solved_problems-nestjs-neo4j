import {ApiProperty} from '@nestjs/swagger'

export class Chat{
    @ApiProperty()
    messages: string[];

}

export class ChatMessage{
    @ApiProperty()
    user_name: string;
    @ApiProperty()
    message: string;
}