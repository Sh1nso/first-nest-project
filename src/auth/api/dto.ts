import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserApiDto {
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

export class UserLoginRequestApiDto {
  @Length(5, 40)
  @ApiProperty()
  @IsEmail()
  email: string;

  @Length(8, 15)
  @ApiProperty()
  @IsString()
  password: string;
}

export class RegisterUserApiResponseDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UserLoginApiResponseDto {
  username: string;

  password: string;

  email: string;

  token: string;
}
