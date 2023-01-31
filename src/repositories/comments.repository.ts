import { Injectable } from '@nestjs/common';
import { Comment } from 'src/entities/comment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
}
