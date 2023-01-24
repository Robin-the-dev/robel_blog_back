import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '이메일' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  readonly nickname: string;
}
