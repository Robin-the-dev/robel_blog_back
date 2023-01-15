import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class TestDto {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '휴대폰 번호' })
  @IsString()
  readonly mobile_number: string;

  @IsOptional()
  @IsDateString()
  readonly created_at?: Date;
}
