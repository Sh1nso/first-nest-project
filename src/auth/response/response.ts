import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsString } from 'class-validator';

export class AuthUserResponse {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  token: string;
}
