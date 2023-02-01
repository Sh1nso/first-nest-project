import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

/**
 * COMMENT
 * Декораторы на валидацию работают только для АПИ Дтошках
 * Для дтох сервисов они не сработают
 * Напомни, как будем в дискорде, я тебе объясню как это под капотом работает
 */
export class RegisterUserDto {
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
