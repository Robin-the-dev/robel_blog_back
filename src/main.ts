import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('RoBel Blog API Docs')
    .setDescription('RoBel Blog 백엔드 API 명세서 입니다.')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS 설정
  app.enableCors();

  // class-validator를 사용하기 위한 설정
  // whitelist: dto에 명시되지 않은 값이 넘어왔을때 해당 값을 제외한다.
  // forbidNonWhitelisted: dto에 명시되지 않은 값이 넘어왔을때 에러를 발생시킨다.
  // transform: 모든 path parameter나 query parameter는 문자열로 오기때문에 controller에서 명시한 type으로 변환시켜준다.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Port 설정
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  await app.listen(PORT);

  console.log(`Server is listening on port ${PORT}...`);
}
bootstrap();
