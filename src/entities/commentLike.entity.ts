import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity({ name: 'commentLike' })
export class CommentLike {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => User, (user) => user.commentLikes)
  user: User;

  @ManyToOne((type) => Comment, (comment) => comment.commentLikes)
  comment: Comment;
}
