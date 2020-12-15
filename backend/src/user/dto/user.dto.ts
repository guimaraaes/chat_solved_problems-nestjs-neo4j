import { ApiProperty } from '@nestjs/swagger'
import { MinLength, MaxLength, Matches, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt'
export enum UserType {
    Staff = 'Staff',
    Client = 'Client',
}

export class CreateUser {
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    username: string;
    @ApiProperty()
    // @MinLength(8)
    // @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
    salt: string;

    async validPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password
    }
}

export class Staff {
    problems_solved_count: number;
    mean_time_on_channel: Date;
    mean_avaliantion_score: number;
}

export class Client {
    quantity_problems: number;
    problems_solved: number;
    avaliantion_mean: number;
}