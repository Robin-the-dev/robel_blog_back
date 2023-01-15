import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TestDto } from 'src/dtos/test.dto';
import { Test } from 'src/entities/test.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Post()
  async createOne(@Body() body: TestDto): Promise<Test> {
    const test = await this.testsService.createOne(body);

    return test;
  }

  @Get()
  async findAll(): Promise<Test[]> {
    const tests = await this.testsService.findAll();

    return tests;
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() body: TestDto): Promise<UpdateResult> {
    const result = await this.testsService.updateOne(id, body);

    return result;
  }

  @Delete(':id')
  async MissingDeleteDateColumnError(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.testsService.deleteOne(id);

    return result;
  }
}
