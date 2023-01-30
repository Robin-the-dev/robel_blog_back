import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: '유저 ID' })
  @IsUUID('4')
  userId: string;

  @ApiProperty({ description: '포스트 ID' })
  @IsUUID('4')
  postId: string;

  @ApiProperty({ description: '댓글 내용' })
  @IsString()
  content: string;
}
