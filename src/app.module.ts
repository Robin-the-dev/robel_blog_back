import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Modules
import { TestsModule } from './tests/tests.module';

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
    TestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
