import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly serviceUser: UserService
    ){}

    @Post()
    post(@Body() user: CreateUser){
        return this.serviceUser.create(user)
    }
}
