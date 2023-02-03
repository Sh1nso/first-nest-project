import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryError } from 'src/common/errors/repository.error';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async getOneUser(userId: number, requestedUserId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['username', 'email', 'sex'],
    });
    if (user && (await this.checkUserOwner(userId, requestedUserId))) {
      return user;
    }
    throw new RepositoryError(
      'You are not owner of this profile or user dose not exist',
    );
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length != 0) {
      return users;
    }
    throw new RepositoryError(`We don't have users. You can be the first!`);
  }

  async checkUserOwner(
    userId: number,
    requestedUserId: number,
  ): Promise<boolean> {
    if (userId != requestedUserId) {
      return false;
    }
    return true;
  }
}
