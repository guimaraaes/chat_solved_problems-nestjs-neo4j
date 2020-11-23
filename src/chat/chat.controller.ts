import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './dto/chat.dto';
import { ApiTags, ApiParam, ApiProperty, ApiBody, ApiQuery } from '@nestjs/swagger';
 

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


    @Get('')
    // @ApiParam({name: 'id_users',
    //             type: 'string', 
    // })
    getChat(@Query('id_users') id: number[]){
        var id_users = []
        id.forEach((i) => { 
            // m = [m, Number(i)]
            // m = m + Number(i)
            id_users.push(Number(i))
            })
        // return m
        return this.chatService.findByIdUsers(id_users)
    }

}
