import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProblemService } from './problem.service';
import { Problem } from './dto/problem.dto';


@ApiTags('problems')
@Controller('problem')
export class ProblemController {
    constructor(
        private readonly problemService: ProblemService
    ) { }

    @Get('client/:id_client')
    getByIdClient(@Param('id_client') id_client: number) {
        return this.problemService.findByIdClient(id_client)
    }

    @Get('staff/:id_staff')
    getByIdStaff(@Param('id_staff') id_staff: number) {
        return this.problemService.findByIdStaff(id_staff)
    }

    @Post()
    post(@Body() problem: Problem) {
        return this.problemService.create(problem)
    }

    @Put('/solved/:id/:id_staff/:avaliation')
    put(@Param('id') id: number,
        @Param('id_staff') id_staff: number,
        @Param('avaliation') avaliation: number) {
        return this.problemService.solved(id, id_staff, avaliation)
    }
}
