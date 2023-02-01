import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { RegisterUserApiDto, UserLoginRequestApiDto } from './dto/auth.api.dto';
import {
  RegisterUserApiResponseDto,
  UserLoginApiResponseDto,
  UserLoginResponseDto,
} from './response/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Api Tags Auth')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  /**
   * COMMENT ✅
   * Сразу приучайся разделять слой API и слой логики
   * Не может быть такого, чтобы один DTO был использован и на API и на сервисах
   * Нужно делать разные DTO
   */
  register(
    @Body() userDto: RegisterUserApiDto,
  ): Promise<RegisterUserApiResponseDto> {
    return this.authService.registerUser(userDto);
  }

  @ApiTags('Api Tags Auth')
  @ApiResponse({ status: 200, type: UserLoginResponseDto })
  @Post('login')
  login(
    @Body() userDto: UserLoginRequestApiDto,
  ): Promise<UserLoginApiResponseDto> {
    return this.authService.loginUser(userDto);
  }
}
