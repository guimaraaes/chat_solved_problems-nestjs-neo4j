import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './dto/chat.dto';
import { ApiTags, ApiParam, ApiProperty, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @Post()
    post(@Body() message: ChatMessage) {
        return this.chatService.sendMessage(message);
    }


    @Get('')
    getChat(@Query('id_users') id_users: number[]) {
        return this.chatService.findByIdUsers(id_users)
    }

}
