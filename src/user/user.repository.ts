import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

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

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    createUserDto.password = await hash(createUserDto.password, 10);
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findUsersById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
  }

  async removeUser(id: number): Promise<User> {
    const user = this.findUsersById(id);
    await this.userRepository.delete(id);
    return user;
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id } });
  }

  async checkUserExistAndOwner(id: number, userId: number): Promise<boolean> {
    const user = await this.findOne({ where: { id } });
    if (user && user.id === userId) {
      return true;
    }
  }
}
