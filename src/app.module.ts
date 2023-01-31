import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Modules
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

// Configs
import { typeOrmModuleOptions } from './config/typeorm.config';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmModuleOptions],
    }),

    // TypeOrm 설정
    TypeOrmModule.forRoot(typeOrmModuleOptions()),

    // Modules
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
