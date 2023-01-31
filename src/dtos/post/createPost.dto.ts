import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '유저 ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: '제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '태그' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
