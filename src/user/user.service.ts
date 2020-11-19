import { Injectable } from '@nestjs/common';
import { AppGateway } from '../app.gateway';

@Injectable()
export class UserService {
    constructor( 
        private gateway: AppGateway
    ){}
}
