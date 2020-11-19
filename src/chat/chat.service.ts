import { Injectable } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { ChatMessage } from './dto/chat.dto';

@Injectable()
export class ChatService {
    constructor( 
        private gateway: AppGateway
    ){}

    sendMessage(data: ChatMessage){
        // return data 
        this.gateway.wss.emit('newMessage', data)

    }
}
