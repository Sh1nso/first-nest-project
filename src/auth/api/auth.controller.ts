import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RegisterUserApiResponseDto,
  UserLoginApiResponseDto,
} from '../response/api.dto';
import { AuthService } from '../services/auth.service';
import { RegisterUserApiDto, UserLoginRequestApiDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Api Tags Auth')
  @ApiResponse({ status: 201, type: RegisterUserApiDto })
  @Post('register')
  register(
    @Body() userDto: RegisterUserApiDto,
  ): Promise<RegisterUserApiResponseDto> {
    return this.authService.registerUser(userDto);
  }

  @ApiTags('Api Tags Auth')
  @ApiResponse({ status: 200, type: UserLoginRequestApiDto })
  @Post('login')
  login(
    @Body() userDto: UserLoginRequestApiDto,
  ): Promise<UserLoginApiResponseDto> {
    return this.authService.loginUser(userDto);
  }
}
