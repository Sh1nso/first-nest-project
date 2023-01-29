import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateColumnDto {
  @Length(5, 15)
  @ApiProperty()
  @IsString()
  name: string;

  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description?: string;
}
