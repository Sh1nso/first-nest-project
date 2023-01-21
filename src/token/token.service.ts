import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenData } from 'src/common/constants/token';


@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateJwtToken(user) {
        const payLoad = {user}

        return this.jwtService.sign(payLoad, {secret: TokenData.SECRET, expiresIn: TokenData.EXPIRE_JWT } ) 
    }
}
