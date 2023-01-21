import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/loginDto';
import { AuthUserResponse } from './response/response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateUserDto})
    @Post('register')
    register(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
        return this.authService.registerUser(userDto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    login(@Body() userDto: UserLoginDTO): Promise<AuthUserResponse> {
        return this.authService.loginUser(userDto)
    }
}
