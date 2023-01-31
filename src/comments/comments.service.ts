import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from 'src/dtos/comment/createComment.dto';
import { UpdateCommentDto } from 'src/dtos/comment/updateComment.dto';
import { Comment } from 'src/entities/comment.entity';
import { CommentsRepository } from 'src/repositories/comments.repository';
import { PostsRepository } from 'src/repositories/posts.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,

    private usersRepository: UsersRepository,

    private postsRepository: PostsRepository,
  ) {}

  async createComment(body: CreateCommentDto): Promise<Comment> {
    const { userId, postId, ...commentDto } = body;

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new HttpException('User does not exist with specified User ID.', HttpStatus.BAD_REQUEST);
    }

    const post = await this.postsRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new HttpException('Post does not exist with specified Post ID.', HttpStatus.BAD_REQUEST);
    }

    const comment = await this.commentsRepository.save({ ...commentDto, user, post });

    return comment;
  }

  async getComments(postId: string): Promise<Comment[]> {
    if (postId) {
      const isPostExisted: boolean = await this.postsRepository.exist({ where: { id: postId } });

      if (!isPostExisted) {
        throw new HttpException('Post does not exist with specified Post ID.', HttpStatus.BAD_REQUEST);
      }
    }

    const comments = await this.commentsRepository.find({
      relations: ['user', 'commentLikes'],
      where: { post: postId && { id: postId } },
    });

    return comments;
  }

  async getComment(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'commentLikes'],
    });

    if (comment === null) {
      throw new HttpException('Comment does not exist with specified Comment ID.', HttpStatus.BAD_REQUEST);
    }

    return comment;
  }

  async updateComment(id: string, body: UpdateCommentDto): Promise<UpdateResult> {
    const isCommentExisted: boolean = await this.commentsRepository.exist({ where: { id } });
    if (!isCommentExisted) {
      throw new HttpException('Comment does not exist with specified Comment ID.', HttpStatus.BAD_REQUEST);
    }

    const result = await this.commentsRepository.update({ id }, body);

    return result;
  }

  async deleteComment(id: string): Promise<DeleteResult> {
    const isCommentExisted: boolean = await this.commentsRepository.exist({ where: { id } });
    if (!isCommentExisted) {
      throw new HttpException('Comment does not exist with specified Comment ID.', HttpStatus.BAD_REQUEST);
    }

    const result = await this.commentsRepository.softDelete({ id });

    return result;
  }
}
