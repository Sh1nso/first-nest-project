import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { hash } from 'bcrypt';
import { UpdateUserDto, UpdateUserResponseDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async deleteUser(userId: number, requestedUserId: number): Promise<boolean> {
    if (await this.userRepository.getOneUser(userId, requestedUserId)) {
      await this.userRepository.delete(userId);
      return true;
    }
  }

  async updateUser(dto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    if (await this.userRepository.getOneUser(dto.userId, dto.requestedUserId)) {
      const hashedPassword = await hash(dto.password, 10);
      await this.userRepository.update(dto.userId, {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      });
      return await this.userRepository.findOne({
        where: { id: dto.userId },
        select: ['username', 'email'],
      });
    }
  }
}
