import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentComment } from 'src/entities/comment.entity';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentComment])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
