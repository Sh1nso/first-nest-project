import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenData } from 'src/common/constants/token';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: TokenData.SECRET
        })
    }

    async validate(payload: any) {
        return {...payload.user}
    }
}