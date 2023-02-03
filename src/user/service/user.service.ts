import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './update.user.dto';
import { UserRepository } from '../user.repository';
import { UpdateUserResponseDto } from '../response/service.response';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async deleteUser(userId: number, requestedUserId: number): Promise<boolean> {
    if (await this.userRepository.getOneUser(userId, requestedUserId)) {
      await this.userRepository.delete(userId);
      return true;
    }
  }

  async updateUser(
    userId: number,
    requestedUserId: number,
    userData: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    if (await this.userRepository.getOneUser(userId, requestedUserId)) {
      const hashedPassword = await hash(userData.password, 10);
      await this.userRepository.update(userId, {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });
      return await this.userRepository.findOne({
        where: { id: userId },
        select: ['username', 'email'],
      });
    }
  }
}
