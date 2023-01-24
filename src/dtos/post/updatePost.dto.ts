import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ description: '제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '내용' })
  @IsOptional()
  @IsString()
  content?: string;
}
