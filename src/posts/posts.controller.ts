import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from 'src/dtos/post/createPost.dto';
import { UpdatePostDto } from 'src/dtos/post/updatePost.dto';
import { Post as PostEntity } from 'src/entities/post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Post API')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Body() body: CreatePostDto): Promise<PostEntity> {
    const post = await this.postsService.createPost(body);

    return post;
  }

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    const posts = await this.postsService.getPosts();

    return posts;
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostDto): Promise<any> {
    const result = await this.postsService.updatePost(id, body);

    return result;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<any> {
    const result = await this.postsService.deletePost(id);

    return result;
  }
}
