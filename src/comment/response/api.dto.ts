import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCommentApiResponseDto {
  @Length(1, 50)
  @ApiProperty()
  @IsString()
  content: string;
}

export class CreateCommentApiResponseDto {
  @Length(1, 50)
  @ApiProperty()
  @IsString()
  content: string;
}
