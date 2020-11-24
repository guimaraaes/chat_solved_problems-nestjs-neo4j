import { Controller, Post, Body, Get, Param, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateUser, UserType } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly serviceUser: UserService
    ) { }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.serviceUser.findById(id)
    }

    @Post()
    @ApiQuery({ name: 'type', enum: UserType })
    post(@Body() user: CreateUser, @Query('type') type: string) {
        // return type
        return this.serviceUser.create(user, type)
    }
}
