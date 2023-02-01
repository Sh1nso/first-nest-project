import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './api/auth.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UserModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
