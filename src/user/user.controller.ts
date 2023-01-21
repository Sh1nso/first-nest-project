import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards} from '@nestjs/common';
import { User } from 'src/entitys/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserService } from './user-service';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  
  @Get(':id')
  findUsersById(@Param('id') id: number): Promise<User> {
    return this.userService.findUsersById(id);
  }
  
  @Delete(':id')
  removeUser(@Param('id') id: number | string): Promise<User>{
    return this.userService.removeUser(id)
  }

  @Put(':id')
  updateUser(@Param('id') id : number, @Body() userData: UpdateUserDto): Promise<User>{
    return this.userService.updateUser(id, userData)
  }
  
}
