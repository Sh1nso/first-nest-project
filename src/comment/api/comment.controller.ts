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
import { ContentComment } from 'src/entities/comment.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CommentRepository } from '../comment.repository';
import { CommentService } from '../service/comment.service';
import { CreateCommentApiDto } from './create.comment.dto';
import { UpdateCommentApiDto } from './update.comment.dto';
import {
  CreateCommentApiResponseDto,
  UpdateCommentApiResponseDto,
} from '../response/api.dto';

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
    @Req() request,
    @Body() commentData: CreateCommentApiDto,
  ): Promise<CreateCommentApiResponseDto> {
    const userId: number = request.user.id;
    return this.commentService.createComment(commentData, userId, cardId);
  }

  @Put(':id/comment/:commentId')
  async updateComment(
    @Param('id') cardId: number,
    @Param('commentId') commentId: number,
    @Req() request,
    @Body() commentData: UpdateCommentApiDto,
  ): Promise<UpdateCommentApiResponseDto> {
    try {
      const userId: number = request.user.id;
      return await this.commentService.updateComment(
        commentData,
        userId,
        cardId,
        commentId,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
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
    @Req() request,
  ): Promise<ContentComment> {
    try {
      const userId: number = request.user.id;
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
  async showAllUserComments(@Req() request): Promise<ContentComment[]> {
    try {
      const userId = request.user.id;

      const comments = await this.commentRepository.getAllComments(userId);
      return comments;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
