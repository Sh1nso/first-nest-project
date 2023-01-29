import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenData } from 'src/common/constants/token';
import { JwtPayLoad } from 'src/common/types/jwt-payload.type';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TokenData.SECRET,
    });
  }

  async validate(payload: JwtPayLoad) {
    const user = await this.userRepository.findOne({
      where: { id: payload.user.id },
    });
    if (user) {
      return { ...payload.user };
    }
    return null;
  }
}
