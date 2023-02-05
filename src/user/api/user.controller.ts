import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UserRepository } from '../user.repository';
import { UserService } from '../service/user.service';
import { UpdateUserApiDto, UpdateUserResponseApiDto } from './dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get()
  showAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  @Get(':id')
  async showOneUser(
    @Param('id') userId: number,
    @CurrentUser() user: User,
  ): Promise<User> {
    try {
      const requestedUserId: number = user.id;
      return await this.userRepository.getOneUser(userId, requestedUserId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') userId: number,
    @CurrentUser() user: User,
  ): Promise<string> {
    try {
      const requestedUserId: number = user.id;
      await this.userService.deleteUser(userId, requestedUserId);
      return `User with id ${userId} was deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() body: UpdateUserApiDto,
    @CurrentUser() user: User,
  ): Promise<UpdateUserResponseApiDto> {
    try {
      const requestedUserId: number = user.id;
      return await this.userService.updateUser({
        userId: userId,
        requestedUserId: requestedUserId,
        username: body.username,
        password: body.password,
        email: body.email,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
