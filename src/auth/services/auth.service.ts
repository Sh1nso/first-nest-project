import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UserLoginRequestDto } from './login.dto';
import { compare, hash } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { RegisterUserDto } from './auth.dto';
import { UserRepository } from 'src/user/user.repository';
import {
  RegisterUserResponseDto,
  UserLoginResponseDto,
} from '../response/service.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async registerUser(
    userDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const exitUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (exitUser) {
      throw new BadRequestException('User with this email already exist');
    }

    userDto.password = await hash(userDto.password, 10);
    const newUser = this.userRepository.create(userDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async loginUser(userDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const existUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (!existUser)
      throw new BadRequestException('User with this email dose not exist');

    const validatePassword = await compare(
      userDto.password,
      existUser.password,
    );

    if (!validatePassword) throw new BadRequestException('Wrong data');
    delete existUser.password;

    const token = await this.tokenService.generateJwtToken(existUser);
    return { ...existUser, token };
  }
}
