import { Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/dtos/post/createPost.dto';
import { UpdatePostDto } from 'src/dtos/post/updatePost.dto';
import { Post } from 'src/entities/post.entity';
import { PostsRepository } from 'src/repositories/posts.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async createPost(body: CreatePostDto): Promise<Post> {
    const post = await this.postsRepository.createPost(body);

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
