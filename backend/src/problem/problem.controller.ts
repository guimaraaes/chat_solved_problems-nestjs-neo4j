import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ProblemService } from './problem.service';
import { Problem } from './dto/problem.dto';

@ApiTags('problems')
@Controller('problem')
export class ProblemController {
    constructor(
        private readonly problemService: ProblemService
    ) { }

    @Get('client/:id_client')
    @ApiOperation({ summary: 'get problems by id client' })
    @ApiOkResponse({ description: 'problems found' })
    @ApiNotFoundResponse({ description: 'no problem found by id client' })
    getByIdClient(@Param('id_client') id_client: number) {
        return this.problemService.findByIdClient(id_client)
    }

    @Get('staff/:id_staff')
    @ApiOperation({ summary: 'get problems by id staff' })
    @ApiOkResponse({ description: 'problems found' })
    @ApiNotFoundResponse({ description: 'no problem found by id staff' })
    getByIdStaff(@Param('id_staff') id_staff: number) {
        return this.problemService.findByIdStaff(id_staff)
    }

    @Post()
    @ApiOperation({ summary: 'create problem' })
    @ApiCreatedResponse({ description: 'problem created' })
    @ApiBadRequestResponse({ description: 'error on create problem' })
    post(@Body() problem: Problem) {
        return this.problemService.create(problem)
    }

    @Put('/solved/:id/:id_staff/:avaliation')
    @ApiOperation({ summary: 'edit problem to solved' })
    @ApiOkResponse({ description: 'problem edit to solved' })
    @ApiBadRequestResponse({ description: 'error on edit problem' })
    put(@Param('id') id: number,
        @Param('id_staff') id_staff: number,
        @Param('avaliation') avaliation: number) {
        return this.problemService.solved(id, id_staff, avaliation)
    }
}
