import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { Neo4jModule } from 'nest-neo4j'
import { HOSTNAME, NEO4J_PASSWORD, SCHEMA, PORT, NEO4J_USER } from './config';

@Module({
  imports: [UserModule, ChatModule,
    Neo4jModule.forRoot({
      scheme: SCHEMA,
      host: HOSTNAME,
      port: PORT,
      username: NEO4J_USER,
      password: NEO4J_PASSWORD
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
