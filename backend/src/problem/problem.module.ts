import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { ChatService } from 'src/chat/chat.service';
import { AppGateway } from 'src/app.gateway';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService, ChatService, AppGateway, UserService]
})
export class ProblemModule { }
