import { Controller, Get, Body, Query, ValidationPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiQuery, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiBadRequestResponse, ApiConflictResponse, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUser, UserType } from 'src/user/dto/user.dto';
import { AuthCredentials } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/singup')
    @ApiOperation({ summary: 'create user' })
    @ApiCreatedResponse({ description: 'user created' })
    @ApiBadRequestResponse({ description: 'error on create user' })
    @ApiConflictResponse({ description: 'email aready exists' })
    @ApiQuery({ name: 'type', enum: UserType })
    singUp(@Body() user: CreateUser, @Query('type') type: string) {
        return this.authService.singUp(user, type)
    }

    @ApiBearerAuth()
    @Post('/singin')
    @ApiOperation({ summary: 'create user' })
    @ApiCreatedResponse({ description: 'user created' })
    @ApiBadRequestResponse({ description: 'error on create user' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    singin(@Body(ValidationPipe) credentials: AuthCredentials): Promise<{ acessToken: string }> {
        return this.authService.singIn(credentials)
    }
}
