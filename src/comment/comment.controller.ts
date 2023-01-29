import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  Put,
  HttpException,
  HttpStatus,
  Delete,
  Get,
} from '@nestjs/common';
import { ServiceError } from 'src/common/errors/service.error';
import { ContentComment } from 'src/entities/comment.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('card')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id/comment/create')
  createComment(
    @Param('id') cardId: number,
    @Req() request,
    @Body() commentData: CreateCommentDto,
  ) {
    const userId: number = request.user.id;
    return this.commentService.createComment(commentData, userId, cardId);
  }

  @Put(':id/comment/:commentId')
  async updateComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @Req() request,
    @Body() commentData: UpdateCommentDto,
  ): Promise<ContentComment> {
    try {
      const userId: number = request.user.id;
      return await this.commentService.updateComment(
        commentData,
        userId,
        cardId,
        commentId,
      );
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Delete(':id/comment/:commentId')
  async deleteComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @Req() request,
  ): Promise<string> {
    try {
      const userId: number = request.user.id;
      return await this.commentService.deleteComment(userId, cardId, commentId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Get(':id/comment/:commentId')
  async showOneComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @Req() request,
  ): Promise<ContentComment> {
    try {
      const userId: number = request.user.id;
      return await this.commentService.getOneComment(userId, cardId, commentId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Get('comments')
  async getAllUserComments(@Req() request): Promise<ContentComment[]> {
    try {
      const userId = request.user.id;
      return await this.commentService.getAllUserComments(userId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }
}
