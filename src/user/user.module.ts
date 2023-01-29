import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/strategy/strategy-jwt';
import { UserService } from './user-service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtStrategy, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
