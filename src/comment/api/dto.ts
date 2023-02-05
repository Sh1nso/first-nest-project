import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentApiDto {
  @Length(1, 50)
  @ApiProperty()
  @IsString()
  content: string;
}

export class UpdateCommentApiDto {
  @Length(1, 50)
  @ApiProperty()
  @IsString()
  content: string;
}

export class UpdateCommentApiResponseDto {
  content: string;
}

export class CreateCommentApiResponseDto {
  content: string;
}
