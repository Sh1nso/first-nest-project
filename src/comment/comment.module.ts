import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from 'src/card/card.module';
import { ContentComment } from 'src/entities/comment.entity';
import { CommentController } from './api/comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './service/comment.service';
@Module({
  imports: [TypeOrmModule.forFeature([ContentComment]), CardModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
