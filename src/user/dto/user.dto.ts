import {ApiProperty} from '@nestjs/swagger'

export class User{
    @ApiProperty()
    name: string;

    @ApiProperty()
    type_user: string;

    @ApiProperty()
    message: string;
}