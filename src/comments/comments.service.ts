import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dtos/comment/createComment.dto';
import { UpdateCommentDto } from 'src/dtos/comment/updateComment.dto';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(body: CreateCommentDto): Promise<Comment> {
    const { userId, postId, ...commentDto } = body;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new HttpException('User does not exist with specified User ID.', HttpStatus.BAD_REQUEST);
    }

    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new HttpException('Post does not exist with specified Post ID.', HttpStatus.BAD_REQUEST);
    }

    const comment = await this.commentRepository.save({ ...commentDto, user, post });

    return comment;
  }

  async getComments(postId: string): Promise<Comment[]> {
    if (postId) {
      const isPostExisted: boolean = await this.postRepository.exist({ where: { id: postId } });

      if (!isPostExisted) {
        throw new HttpException('Post does not exist with specified Post ID.', HttpStatus.BAD_REQUEST);
      }
    }

    const comments = await this.commentRepository.find({
      relations: ['user', 'commentLikes'],
      where: { post: postId && { id: postId } },
    });

    return comments;
  }

  async getComment(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'commentLikes'],
    });

    if (comment === null) {
      throw new HttpException('Comment does not exist with specified Comment ID.', HttpStatus.BAD_REQUEST);
    }

    return comment;
  }

  async updateComment(id: string, body: UpdateCommentDto): Promise<UpdateResult> {
    const isCommentExisted: boolean = await this.commentRepository.exist({ where: { id } });
    if (!isCommentExisted) {
      throw new HttpException('Comment does not exist with specified Comment ID.', HttpStatus.BAD_REQUEST);
    }

    const result = await this.commentRepository.update({ id }, body);

    return result;
  }

  async deleteComment(id: string): Promise<DeleteResult> {
    const isCommentExisted: boolean = await this.commentRepository.exist({ where: { id } });
    if (!isCommentExisted) {
      throw new HttpException('Comment does not exist with specified Comment ID.', HttpStatus.BAD_REQUEST);
    }

    const result = await this.commentRepository.softDelete({ id });

    return result;
  }
}
