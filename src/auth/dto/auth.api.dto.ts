import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

/**
 * COMMENT
 * Вижу что тебе неудобно разделять DTO для апи и для сервисов
 * Предлагаю в папке auth сделать две подпапки: api и services
 * В папку api перенести контроллер и файлик с его дто-шками
 * В папку services перенести сервис и его дто-шки
 * Таким образом разделим их дто-шки, чтобы они не лежали в одном файлике
 */
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
