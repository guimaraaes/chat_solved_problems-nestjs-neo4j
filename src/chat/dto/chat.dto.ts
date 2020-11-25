import { ApiProperty } from '@nestjs/swagger'

export class MessageContent {
    @ApiProperty()
    message: string;
    @ApiProperty()
    date: Date;
}

export class ChatMessage {
    @ApiProperty()
    id_user_send_message: number;
    @ApiProperty({ type: 'array', items: { type: 'number' } })
    id_users_on_chat: number[];
    @ApiProperty()
    message_content: MessageContent;
}

export class EditChat {
    @ApiProperty({ type: 'array', items: { type: 'number' } })
    add_id_users_on_chat: number[];
    @ApiProperty({ type: 'array', items: { type: 'number' } })
    rmv_id_users_on_chat: number[];
}
