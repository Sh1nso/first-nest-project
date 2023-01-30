import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/loginDto';
import { AuthUserResponse } from './response/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
    * COMMENT
    * Апи теги обычно пишут как название для группы эндпоинтов что-ли
    * Тут, я бы написал Api Tags Auth, чтобы в сваггере эти эндпоинты сгруппировались вокруг Auth вкладки
  */
  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  /**
    * COMMENT
    * Сразу приучайся разделять слой API и слой логики
    * Не может быть такого, чтобы один DTO был использован и на API и на сервисах
    * Нужно делать разные DTO
  */
  register(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(userDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(@Body() userDto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(userDto);
  }
}
