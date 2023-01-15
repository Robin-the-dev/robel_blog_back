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

  // Port 설정
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  await app.listen(PORT);

  console.log(`Server is listening on port ${PORT}...`);
}
bootstrap();
