import { Injectable } from '@nestjs/common';
import { ServiceError } from 'src/common/errors/service.error';
import { CommentRepository } from '../comment.repository';
import {
  CreateCommentDto,
  CreateCommentResponseDto,
  UpdateCommentDto,
  UpdateCommentResponseDto,
} from './dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    dto: CreateCommentDto,
  ): Promise<CreateCommentResponseDto> {
    if (this.checkCountOfComments(dto.cardId)) {
      const newComment = await this.commentRepository.save({
        content: dto.content,
        userId: dto.userId,
        cardId: dto.cardId,
      });
      return newComment;
    }
    throw new ServiceError('Limit of comments');
  }

  async updateComment(
    dto: UpdateCommentDto,
  ): Promise<UpdateCommentResponseDto> {
    if (
      await this.commentRepository.getOneComment(
        dto.userId,
        dto.cardId,
        dto.commentId,
      )
    ) {
      await this.commentRepository.update(dto.commentId, {
        content: dto.content,
      });
      return this.commentRepository.findOne({
        where: { id: dto.commentId },
        select: ['content'],
      });
    }
  }

  async deleteComment(
    userId: number,
    cardId: number,
    commentId: number,
  ): Promise<boolean> {
    const isCommentExist = await this.commentRepository.getOneComment(
      userId,
      cardId,
      commentId,
    );
    if (!isCommentExist) {
      throw new ServiceError(
        'You are not owner of this comment or comment with requested id does not exist in this card',
      );
    }
    await this.commentRepository.delete(commentId);
    return true;
  }

  async checkCountOfComments(cardId: number): Promise<boolean> {
    const comments = await this.commentRepository.count({
      where: { card: { id: cardId } },
    });
    if (comments === 5) {
      return true;
    }
    return false;
  }
}
