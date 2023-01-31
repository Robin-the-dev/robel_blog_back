import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('char', { length: 20 })
  name!: string;

  @ManyToOne((type) => Post, (post) => post.tags, { onDelete: 'CASCADE' })
  post: Post;
}
