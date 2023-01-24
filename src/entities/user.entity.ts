import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentLike } from './commentLike.entity';
import { Post } from './post.entity';
import { PostLike } from './postLike.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('char', { length: 50 })
  email!: string;

  @Column('varchar', { length: 64 })
  password!: string;

  @Column('varchar', { length: 20 })
  nickname!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => PostLike, (postLike) => postLike.user)
  postLikes: PostLike[];

  @OneToMany((type) => CommentLike, (commentLike) => commentLike.user)
  commentLikes: CommentLike[];
}
