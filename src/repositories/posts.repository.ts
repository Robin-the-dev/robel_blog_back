import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/dtos/post/createPost.dto';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class PostsRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(createPostDto: CreatePostDto, entityManager?: EntityManager): Promise<Post> {
    const manager = entityManager || this.manager;

    const { userId, tags: tagNames, ...postDto } = createPostDto;

    const user = await manager.findOneBy(User, { id: userId });

    if (user === null) {
      throw new HttpException('User does not exist with specified User ID', HttpStatus.BAD_REQUEST);
    }

    const tags: Tag[] = [];
    for (const tagName of tagNames) {
      const tag = manager.create(Tag, { name: tagName });

      tags.push(tag);
    }

    const post = await manager.save(Post, { ...postDto, user, tags });

    return post;
  }
}
