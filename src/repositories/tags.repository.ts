import { Injectable } from '@nestjs/common';
import { Tag } from 'src/entities/tag.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }
}
