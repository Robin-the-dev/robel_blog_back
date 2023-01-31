import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/dtos/post/createPost.dto';
import { UpdatePostDto } from 'src/dtos/post/updatePost.dto';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { PostsRepository } from 'src/repositories/posts.repository';
import { TagsRepository } from 'src/repositories/tags.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
    private tagsRepository: TagsRepository,
  ) {}

  async createPost(body: CreatePostDto): Promise<Post> {
    const { userId, tags: tagNames, ...postDto } = body;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (user === null) {
      throw new HttpException('User does not exist with specified User Id.', HttpStatus.BAD_REQUEST);
    }

    const tags: Tag[] = [];
    for (const tagName of tagNames) {
      const tag = this.tagsRepository.create({ name: tagName });

      tags.push(tag);
    }

    const post = await this.postsRepository.save({ ...postDto, user, tags });

    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postsRepository.find({ relations: ['user'] });

    return posts;
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'tags', 'postLikes'],
    });

    return post;
  }

  async updatePost(id: string, body: UpdatePostDto): Promise<UpdateResult> {
    const result = await this.postsRepository.update({ id }, body);

    return result;
  }

  async deletePost(id: string): Promise<DeleteResult> {
    const result = await this.postsRepository.softDelete({ id });

    return result;
  }
}
