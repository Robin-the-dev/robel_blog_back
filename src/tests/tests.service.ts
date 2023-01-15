import { Injectable } from '@nestjs/common';
import { TestDto } from 'src/dtos/test.dto';
import { Test } from 'src/entities/test.entity';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TestsService {
  constructor(private dataSource: DataSource) {}

  async createOne(body: TestDto): Promise<Test> {
    const testDto = this.dataSource.manager.create(Test, body);
    const test = await this.dataSource.manager.save(Test, testDto);

    return test;
  }

  async findAll(): Promise<Test[]> {
    const tests = await this.dataSource.manager.findBy(Test, {});

    return tests;
  }

  async updateOne(id: string, body: TestDto): Promise<UpdateResult> {
    const result = await this.dataSource.manager.update(Test, { id }, body);

    return result;
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    const result = await this.dataSource.manager.delete(Test, { id });

    return result;
  }
}
