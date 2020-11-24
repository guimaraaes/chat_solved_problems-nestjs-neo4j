import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProblemService } from './problem.service';
import { Problem } from './dto/problem.dto';
import { Message } from 'src/chat/entity/chat.entity';
import { ChatMessage } from 'src/chat/dto/chat.dto';

@ApiTags('problems')
@Controller('problem')
export class ProblemController {
    constructor(
        private readonly problemService: ProblemService
    ) { }

    @Get(':id_client')
    getByIdClient(@Param('id_client') id_client: number) {
        return this.problemService.findByIdClient(id_client)
    }

    @Get(':id_staff')
    getByIdStaff(@Param('id_staff') id_staff: number) {
        return this.problemService.findByIdStaff(id_staff)
    }

    @Post()
    post(@Body() problem: Problem) {
        return this.problemService.create(problem)
    }

    @Put(':id')
    put(@Param('id') id: number) {
        return this.problemService.solved(id)
    }
}
