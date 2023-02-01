import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCardDto {
  @Length(5, 15)
  @ApiProperty()
  @IsString()
  name: string;

  @Length(5, 15)
  @ApiProperty()
  @IsString()
  theme: string;

  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description: string;
}

export class UpdateApiCardDto {
  @Length(5, 15)
  @ApiProperty()
  @IsString()
  name: string;

  @Length(5, 15)
  @ApiProperty()
  @IsString()
  theme: string;

  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description: string;
}
