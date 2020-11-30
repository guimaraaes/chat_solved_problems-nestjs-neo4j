import { Controller, Post, Body, Get, Param, Query, Put, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './dto/chat.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @Get('')
    @ApiOperation({ summary: 'get chat by ids users' })
    @ApiOkResponse({ description: 'chat found' })
    @ApiNotFoundResponse({ description: 'no chat found by ids users' })
    getChat(@Query('id_users') id_users: number[]) {
        return this.chatService.findByIdUsers(id_users)
    }

    @Post()
    @ApiOperation({ summary: 'send message to chat' })
    @ApiCreatedResponse({ description: 'message send' })
    @ApiBadRequestResponse({ description: 'error on send message' })
    post(@Body() message: ChatMessage) {
        return this.chatService.sendMessage(message);
    }

    @Put('remove_user/:id/:id_remove')
    @ApiOperation({ summary: 'remove user from chat by id' })
    @ApiOkResponse({ description: 'message send' })
    @ApiBadRequestResponse({ description: 'no user found by ids users or internal error on remove' })
    putRemoveUser(@Param('id') id: number, @Param('id_remove') id_remove: number) {
        return this.chatService.editChatRemove(id, id_remove)
    }

    @Put('add_user/:id/:id_add')
    @ApiOperation({ summary: 'add user on chat by id' })
    @ApiOkResponse({ description: 'message send' })
    @ApiNotFoundResponse({ description: 'no user found by ids users or internal error on add' })
    putAddUser(@Param('id') id: number, @Param('id_add') id_add: number) {
        return this.chatService.editChatAdd(id, id_add)
    }

}
