import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateApiCardDto {
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

export class ResponseApiCardDto {
  name: string;

  theme: string;

  description: string;
}

export class ResponseUpdateApiCardDto {
  name: string;

  theme: string;

  description: string;
}
