import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenData } from 'src/common/constants/token';
import { JwtPayLoad } from 'src/common/types/jwt-payload.type';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: User): Promise<string> {
    const payLoad: JwtPayLoad = { user };

    return this.jwtService.sign(payLoad, {
      secret: TokenData.SECRET,
      expiresIn: TokenData.EXPIRE_JWT,
    });
  }
}
