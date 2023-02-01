import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsString } from 'class-validator';

/**
 * COMMENT
 * Это хорошая идея -- писать для Response свой тип
 * Можешь для входного DTO писать UserLoginRequest
 * а для выходного DTO писать UserLoginResponse
 */
/**
 * COMMENT
 * AuthUserResponse, Auth -- многозначительное слово, за ним может быть и рега и вход
 * Уточни, это UserLoginResponse?
 */

export class UserLoginResponseDto {
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

export class RegisterUserResponseDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
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
