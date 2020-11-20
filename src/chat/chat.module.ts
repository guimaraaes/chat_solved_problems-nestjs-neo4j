import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from '../app.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, AppGateway]
})
export class ChatModule {}