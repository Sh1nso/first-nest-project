import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateColumnResponseApiDto {
  @Length(5, 50)
  @ApiProperty()
  @IsString()
  name: string;
  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description?: string;
}

export class UpdateColumnResponseApiDto {
  @Length(5, 50)
  @ApiProperty()
  @IsString()
  name: string;
  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description?: string;
}
