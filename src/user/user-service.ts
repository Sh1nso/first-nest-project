import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/entitys/user.entity";
import { Repository } from 'typeorm';
import { UpdateUserDto } from "./dto/update-user-dto";
import { hash } from 'bcrypt'


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ) {}


      async getAll(): Promise<User[]> {
        return await this.userRepository.find({relations:['columns']})
      }

      async createUser(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await hash(createUserDto.password, 10)
        const newUser = this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser)
        return newUser
      }
          
      async findUsersById(id: string| number): Promise<User>  {
        return await this.userRepository.findOne({where: {id}, relations: ['columns']});
      }

      async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: {email} });
        if (user) {
          return user;
        }
      }


      async removeUser(id: string| number): Promise<User>{
        const user = this.findUsersById(id)
        await this.userRepository.delete(id)
        return user
      }

      async updateUser(id: number, userData: UpdateUserDto): Promise<User>{
        const updatedPost = await this.userRepository.findOne({where: {id}})
        await this.userRepository.update(id, userData)
        if (updatedPost) {
          return updatedPost
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }
    }

