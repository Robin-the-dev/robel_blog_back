import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Tag } from 'src/entities/tag.entity';
import { TagsRepository } from 'src/repositories/tags.repository';
import { PostsRepository } from 'src/repositories/posts.repository';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Tag])],
  providers: [PostsService, PostsRepository, UsersRepository, TagsRepository],
  controllers: [PostsController],
})
export class PostsModule {}
