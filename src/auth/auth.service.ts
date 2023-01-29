import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user-service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { BadRequestException } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto/loginDto';
import { compare } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { AuthUserResponse } from './response/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    const exitUser = await this.userService.findUserByEmail(userDto.email);
    if (exitUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    return this.userService.createUser(userDto);
  }

  async loginUser(userDto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(userDto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const validatePassword = await compare(
      userDto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    delete existUser.password;

    const token = await this.tokenService.generateJwtToken(existUser);
    return { ...existUser, token };
  }
}
