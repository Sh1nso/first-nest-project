import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserLoginRequestDto {
  @Length(5, 40)
  @ApiProperty()
  @IsEmail()
  email: string;

  @Length(8, 15)
  @ApiProperty()
  @IsString()
  password: string;
}
