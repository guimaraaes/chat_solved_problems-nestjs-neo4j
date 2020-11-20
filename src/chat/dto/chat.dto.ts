import {ApiProperty} from '@nestjs/swagger'

class MessageContent{
    @ApiProperty()
    name_user: string;
    @ApiProperty()
    message:string;
    @ApiProperty()
    date: Date;
}

export class ChatMessage{
    @ApiProperty()
    id_user_send_message: number;
    @ApiProperty({type: 'array', items: {type: 'number'}})
    id_users_on_chat: number[];
    @ApiProperty()
    message_content: MessageContent;
}
