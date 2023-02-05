import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UserRepository } from 'src/user/user.repository';
import {
  RegisterUserDto,
  RegisterUserResponseDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const exitUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (exitUser) {
      throw new BadRequestException('User with this email already exist');
    }

    dto.password = await hash(dto.password, 10);
    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async loginUser(dto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const existUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!existUser)
      throw new BadRequestException('User with this email dose not exist');

    const validatePassword = await compare(dto.password, existUser.password);

    if (!validatePassword) throw new BadRequestException('Wrong data');
    delete existUser.password;

    const token = await this.tokenService.generateJwtToken(existUser);
    return { ...existUser, token };
  }
}
