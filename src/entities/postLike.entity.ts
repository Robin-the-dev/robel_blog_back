import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity({ name: 'postLike' })
export class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => User, (user) => user.postLikes)
  user: User;

  @ManyToOne((type) => Post, (post) => post.postLikes)
  post: Post;
}
