import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UserRepository } from '../user.repository';
import { UserService } from '../service/user.service';
import { UpdateUserApiDto } from './update.dto';
import { UpdateUserResponseApiDto } from '../response/api.response';

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
    @Req() request,
  ): Promise<User> {
    try {
      const requestedUserId = request.user.id;

      return await this.userRepository.getOneUser(userId, requestedUserId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') userId: number,
    @Req() request,
  ): Promise<string> {
    try {
      const requestedUserId = request.user.id;
      await this.userService.deleteUser(userId, requestedUserId);
      return `User with id ${userId} was deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() userData: UpdateUserApiDto,
    @Req() request,
  ): Promise<UpdateUserResponseApiDto> {
    try {
      const requestedUserId = request.user.id;
      return await this.userService.updateUser(
        userId,
        requestedUserId,
        userData,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
