import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001)
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  wss;
  private logger = new Logger('AppGateway');
  handleConnection(client) {
    this.logger.log('new client connected');

    client.emit('connection', ('successfully connected'));
  }

  handlerDisconnect() {
    this.logger.log('client  disconnected')
  }
}
