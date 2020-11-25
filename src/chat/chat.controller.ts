import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @Get('')
    getChat(@Query('id_users') id_users: number[]) {
        return this.chatService.findByIdUsers(id_users)
    }

    @Post()
    post(@Body() message: ChatMessage) {
        return this.chatService.sendMessage(message);
    }

    @Put('remove_user/:id/:id_remove')
    putRemoveUser(@Param('id') id: number, @Param('id_remove') id_remove: number) {
        return this.chatService.editChatRemove(id, id_remove)
    }

    @Put('add_user/:id/:id_add')
    putAddUser(@Param('id') id: number, @Param('id_add') id_add: number) {
        return this.chatService.editChatAdd(id, id_add)
    }

}
