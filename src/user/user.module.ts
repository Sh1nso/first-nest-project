import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/entitys/user.entity";
import { JwtStrategy } from "src/strategy/strategy-jwt";
import { UserService } from "./user-service";
import { UserController } from "./user.controller";


@Module({
    imports: [TypeOrmModule.forFeature([User]),],
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule{

}