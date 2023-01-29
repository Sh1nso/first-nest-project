import { User } from 'src/entities/user.entity';

export type JwtPayLoad = {
  user: User;
};
