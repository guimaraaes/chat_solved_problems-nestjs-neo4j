
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator'

export class AuthCredentials {
    @ApiProperty()
    @IsNotEmpty()
    // @IsEmail()
    username: string;


    @ApiProperty()
    @IsNotEmpty()

    password: string;
}

