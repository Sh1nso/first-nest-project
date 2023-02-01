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
import { ServiceError } from 'src/common/errors/service.error';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async findUsersById(@Param('id') id: number, @Req() request): Promise<User> {
    try {
      const userId = request.user.id;
      return await this.userService.findUsersById(id, userId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number, @Req() request): Promise<string> {
    try {
      const userId = request.user.id;
      return await this.userService.removeUser(id, userId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto,
    @Req() request,
  ): Promise<User> {
    try {
      const userId = request.user.id;
      return await this.userService.updateUser(id, userId, userData);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }
}
