import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserRepository } from './user.repository';
import { ServiceError } from 'src/common/errors/service.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const newUser = await this.userRepository.createUser(createUserDto);
    return newUser;
  }

  async findUsersById(id: number, userId: number): Promise<User> {
    if (await this.userRepository.checkUserExistAndOwner(id, userId)) {
      return await this.userRepository.findUsersById(id);
    }
    throw new ServiceError(
      'User does not exist or you are not owner of this account ',
    );
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }

  async removeUser(id: number, userId: number): Promise<string> {
    if (await this.userRepository.checkUserExistAndOwner(id, userId)) {
      await this.userRepository.delete(id);
      return `User with id ${id} was deleted`;
    }
    throw new ServiceError(
      'User does not exist or you are not owner of this account ',
    );
  }

  async updateUser(
    id: number,
    userId: number,
    userData: UpdateUserDto,
  ): Promise<User> {
    if (await this.userRepository.checkUserExistAndOwner(id, userId)) {
      return await this.userRepository.updateUser(id, userData);
    }
    throw new ServiceError(
      'User does not exist or you are not owner of this account ',
    );
  }
}
