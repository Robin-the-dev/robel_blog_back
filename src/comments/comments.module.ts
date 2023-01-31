import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { CommentsRepository } from 'src/repositories/comments.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { PostsRepository } from 'src/repositories/posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  providers: [CommentsService, CommentsRepository, UsersRepository, PostsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
