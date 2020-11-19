import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
