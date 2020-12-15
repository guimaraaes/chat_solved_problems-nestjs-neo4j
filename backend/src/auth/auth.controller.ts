import { Controller, Get, Body, Query, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiQuery, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiBadRequestResponse, ApiConflictResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUser, UserType } from 'src/user/dto/user.dto';
import { AuthCredentials } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('/singup')
    @ApiOperation({ summary: 'create user' })
    @ApiCreatedResponse({ description: 'user created' })
    @ApiBadRequestResponse({ description: 'error on create user' })
    @ApiConflictResponse({ description: 'email aready exists' })
    @ApiQuery({ name: 'type', enum: UserType })
    singUp(@Body() user: CreateUser, @Query('type') type: string) {
        return this.authService.singUp(user, type)
    }

    @ApiBearerAuth()
    @Get('/singin')
    @ApiOperation({ summary: 'create user' })
    @ApiCreatedResponse({ description: 'user created' })
    @ApiBadRequestResponse({ description: 'error on create user' })
    @ApiQuery({ name: 'type', enum: UserType })
    singin(@Body(ValidationPipe) credentials: AuthCredentials): Promise<{ acessToken: string }> {
        return this.authService.singIn(credentials)
    }
}
