import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseApiCardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  theme: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class ResponseUpdateApiCardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  theme: string;

  @ApiProperty()
  @IsString()
  description: string;
}
