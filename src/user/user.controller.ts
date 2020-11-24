import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly serviceUser: UserService
    ){}

    @Get(':id')
    getById( @Param('id') id: number){
        return this.serviceUser.findById(id)
    }

    @Post()
    post(@Body() user: CreateUser){
        return this.serviceUser.create(user)
    }
}
