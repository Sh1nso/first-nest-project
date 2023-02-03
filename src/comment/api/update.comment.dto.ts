import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCommentApiDto {
  @Length(1, 50)
  @ApiProperty()
  @IsString()
  content: string;
}