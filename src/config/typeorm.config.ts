import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Entities
import { Comment } from 'src/entities/comment.entity';
import { CommentLike } from 'src/entities/commentLike.entity';
import { Post } from 'src/entities/post.entity';
import { PostLike } from 'src/entities/postLike.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';

export const typeOrmModuleOptions = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Post, Comment, Tag, PostLike, CommentLike],
  synchronize: false,
});
