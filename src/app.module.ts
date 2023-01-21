import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-sourse';
import { ColumnController } from './column/column.controller';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { ColumnModule } from './column/column.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  AuthModule,
  TokenModule,
  ColumnModule],
  controllers: [AppController, ColumnController],
  providers: [AppService],
})
export class AppModule {}

