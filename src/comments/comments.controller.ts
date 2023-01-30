import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/dtos/comment/createComment.dto';
import { UpdateCommentDto } from 'src/dtos/comment/updateComment.dto';
import { Comment } from 'src/entities/comment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('Comment API')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentsService.createComment(body);

    return comment;
  }

  @Get()
  @ApiQuery({ name: 'postId', required: false, type: String })
  async getComments(@Query('postId') postId: string): Promise<Comment[]> {
    const comments = await this.commentsService.getComments(postId);

    return comments;
  }

  @Get(':id')
  async getComment(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentsService.getComment(id);

    return comment;
  }

  @Put(':id')
  async updateComment(@Param('id') id: string, @Body() body: UpdateCommentDto): Promise<UpdateResult> {
    const result = await this.commentsService.updateComment(id, body);

    return result;
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.commentsService.deleteComment(id);

    return result;
  }
}
