import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiQuery, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly serviceUser: UserService
    ) { }

    @Get('/clients')
    @ApiOperation({ summary: 'get all clients' })
    @ApiOkResponse({ description: 'users found' })
    @ApiNotFoundResponse({ description: 'no user found' })
    getAllClients() {
        return this.serviceUser.findAllClients()
    }

    @Get('staffs')
    @ApiOperation({ summary: 'get all staffs' })
    @ApiOkResponse({ description: 'users found' })
    @ApiNotFoundResponse({ description: 'no user found' })
    getAllStaffs() {
        return this.serviceUser.findAllStaffs()
    }


    @Get(':id')
    @ApiOperation({ summary: 'get user by id' })
    @ApiOkResponse({ description: 'user found' })
    @ApiNotFoundResponse({ description: 'User not found' })
    getById(@Param('id') id: number) {
        return this.serviceUser.findById(id)
    }

    // @Post()
    // @ApiOperation({ summary: 'create user' })
    // @ApiCreatedResponse({ description: 'user created' })
    // @ApiBadRequestResponse({ description: 'error on create user' })
    // @ApiQuery({ name: 'type', enum: UserType })
    // post(@Body() user: CreateUser, @Query('type') type: string) {
    //     return this.serviceUser.create(user, type)
    // }
}
