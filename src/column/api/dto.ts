import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateColumnApiDto {
  @Length(5, 15)
  @ApiProperty()
  @IsString()
  name: string;

  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description?: string;
}

export class UpdateColumnApiDto {
  @Length(5, 15)
  @ApiProperty()
  @IsString()
  name: string;

  @Length(5, 50)
  @ApiProperty()
  @IsString()
  description?: string;
}

export class CreateColumnResponseApiDto {
  name: string;

  description?: string;
}

export class UpdateColumnResponseApiDto {
  name: string;

  description?: string;
}
