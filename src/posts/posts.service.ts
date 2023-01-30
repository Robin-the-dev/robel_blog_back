import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dtos/post/createPost.dto';
import { UpdatePostDto } from 'src/dtos/post/updatePost.dto';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async createPost(body: CreatePostDto): Promise<Post> {
    const { userId, tags, ...postDto } = body;

    const user = await this.userRepository.findOneBy({ id: userId });

    if (user === null) {
      throw new HttpException('User does not exist with specified User ID.', HttpStatus.BAD_REQUEST);
    }

    const post = await this.postRepository.save({ ...postDto, user });

    for (const tag of tags) {
      await this.tagRepository.save({ name: tag, post });
    }

    return post;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find({ relations: ['user'] });

    return posts;
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'tags', 'postLikes'],
    });

    return post;
  }

  async updatePost(id: string, body: UpdatePostDto): Promise<any> {
    const result = await this.postRepository.update({ id }, body);

    return result;
  }

  async deletePost(id: string): Promise<any> {
    const result = await this.postRepository.softDelete({ id });

    return result;
  }
}
