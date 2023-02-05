import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Put,
  HttpException,
  HttpStatus,
  Delete,
  Get,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ContentComment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CommentRepository } from '../comment.repository';
import { CommentService } from '../service/comment.service';
import {
  CreateCommentApiDto,
  CreateCommentApiResponseDto,
  UpdateCommentApiDto,
  UpdateCommentApiResponseDto,
} from './dto';

@UseGuards(JwtAuthGuard)
@Controller('card')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentRepository: CommentRepository,
  ) {}

  @Post(':id/comment/create')
  createComment(
    @Param('id') cardId: number,
    @CurrentUser() user: User,
    @Body() body: CreateCommentApiDto,
  ): Promise<CreateCommentApiResponseDto> {
    const userId: number = user.id;
    return this.commentService.createComment({
      content: body.content,
      cardId: cardId,
      userId: userId,
    });
  }

  @Put(':id/comment/:commentId')
  async updateComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @CurrentUser() user: User,
    @Body() body: UpdateCommentApiDto,
  ): Promise<UpdateCommentApiResponseDto> {
    try {
      const userId: number = user.id;
      return await this.commentService.updateComment({
        content: body.content,
        cardId: cardId,
        userId: userId,
        commentId: commentId,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id/comment/:commentId')
  async deleteComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @CurrentUser() user: User,
  ): Promise<string> {
    try {
      const userId: number = user.id;
      await this.commentService.deleteComment(userId, cardId, commentId);
      return `Comment with id ${commentId} was deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id/comment/:commentId')
  async showOneComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @CurrentUser() user: User,
  ): Promise<ContentComment> {
    try {
      const userId: number = user.id;
      return await this.commentRepository.getOneComment(
        userId,
        cardId,
        commentId,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Get('comments')
  async showAllUserComments(
    @CurrentUser() user: User,
  ): Promise<ContentComment[]> {
    try {
      const userId: number = user.id;

      const comments = await this.commentRepository.getAllComments(userId);
      return comments;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
