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

  /**
    * COMMENT
    * ДТО для метода сервисах держи рядом с сервисом
    * Сделай лучше здесь (в этой папке) auth.dto.ts и храни дто там
    * Названия ДТО пишутся от названия метода -- на вход RegisterUserDto, на выход RegisterUserResponseDto
  */
  async registerUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    /**
    * COMMENT
    * Не делай из сервиса репозиторий, забудь про то, чтобы в сервисе были методы find, update, delete
    * Не стесняйся в сервисах вне папки user (например здесь) использовать репозиторий для user-а
    */
    const exitUser = await this.userService.findUserByEmail(userDto.email);
    if (exitUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    return this.userService.createUser(userDto);
  }

  async loginUser(userDto: UserLoginDTO): Promise<AuthUserResponse> {
    /**
      * COMMENT
      * Не делай из сервиса репозиторий, забудь про то, чтобы в сервисе были методы find, update, delete
      * Не стесняйся в сервисах вне папки user (например здесь) использовать репозиторий для user-а
      * throw new BadRequestException('User with this email dose not exist')
    */
    const existUser = await this.userService.findUserByEmail(userDto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const validatePassword = await compare(
      userDto.password,
      existUser.password,
    );
    /**
    * COMMENT
    * Не храни текста ошибок в отдельной файле, пиши их inline, прямо в коде ошибки
    * 
    */
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    delete existUser.password;

    const token = await this.tokenService.generateJwtToken(existUser);
    return { ...existUser, token };
  }
}
