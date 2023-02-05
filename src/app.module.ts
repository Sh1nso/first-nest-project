import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from './db/typeorm/typeorm.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UserModule,
    AuthModule,
    TokenModule,
    ColumnModule,
    CardModule,
    CommentModule,
    TypeOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
