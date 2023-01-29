import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseCard {
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
