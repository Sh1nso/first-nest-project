import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BadRequestException } from '@nestjs/common';
import { UserLoginRequestDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import {
  RegisterUserResponseDto,
  UserLoginResponseDto,
} from './response/response';
import { RegisterUserDto } from './dto/auth.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * COMMENT ✅
   * ДТО для метода сервисах держи рядом с сервисом
   * Сделай лучше здесь (в этой папке) auth.dto.ts и храни дто там
   * Названия ДТО пишутся от названия метода -- на вход RegisterUserDto, на выход RegisterUserResponseDto
   */
  async registerUser(
    userDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    /**
     * COMMENT ✅
     * Не делай из сервиса репозиторий, забудь про то, чтобы в сервисе были методы find, update, delete
     * Не стесняйся в сервисах вне папки user (например здесь) использовать репозиторий для user-а
     */
    const exitUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (exitUser) {
      throw new BadRequestException('User with this email already exist');
    }

     /**
     * COMMENT 
     * Коммент выше поправил, а до сюда не дошел)
     * Тут тоже репозиториевский метод у UserService.
     * Понимаю, что у тебя может быть разрыв шаблона, ведь я писал что в сервисах должны быть мутации данных
     * Тут тогда скорее предлагаю внутрянку createUser перенести в этот метод (в том числе с созданием записи о новом пользователе)
     */
    return this.userService.createUser(userDto);
  }

  /**
   * Вот тут очень хорошо сделал
   * В методе вызовы репозиториев и инкапсулирована логика
   */
  async loginUser(userDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    /**
     * COMMENT ✅
     * Не делай из сервиса репозиторий, забудь про то, чтобы в сервисе были методы find, update, delete
     * Не стесняйся в сервисах вне папки user (например здесь) использовать репозиторий для user-а
     * throw new BadRequestException('User with this email dose not exist')
     */
    const existUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (!existUser)
      throw new BadRequestException('User with this email dose not exist');

    const validatePassword = await compare(
      userDto.password,
      existUser.password,
    );
    /**
     * COMMENT ✅
     * Не храни текста ошибок в отдельной файле, пиши их inline, прямо в коде ошибки
     */
    if (!validatePassword) throw new BadRequestException('Wrong data');
    delete existUser.password;

    const token = await this.tokenService.generateJwtToken(existUser);
    return { ...existUser, token };
  }
}
