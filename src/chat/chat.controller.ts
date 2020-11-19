import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ){}

    @Post()
    post(@Body() message: ChatMessage){
        return this.chatService.sendMessage(message);
    }

}
