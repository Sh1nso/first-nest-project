import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserResponseApiDto {
  @Length(5, 15)
  @ApiProperty()
  @IsString()
  username: string;

  @Length(5, 30)
  @ApiProperty()
  @IsEmail()
  email: string;

  @Length(8, 15)
  @ApiProperty()
  @IsString()
  password: string;
}
