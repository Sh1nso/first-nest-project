import { Injectable } from '@nestjs/common';
import { ServiceError } from 'src/common/errors/service.error';
import { CommentRepository } from '../comment.repository';
import {
  CreateCommentResponseDto,
  UpdateCommentResponseDto,
} from '../response/service.dto';
import { CreateCommentDto } from './create.comment.dto';
import { UpdateCommentDto } from './update.comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    commentData: CreateCommentDto,
    userId,
    cardId,
  ): Promise<CreateCommentResponseDto> {
    const newComment = await this.commentRepository.create({
      content: commentData.content,
      user: userId,
      card: cardId,
    });
    await this.commentRepository.save(newComment);
    return newComment;
  }

  async updateComment(
    updateCommentData: UpdateCommentDto,
    userId: number,
    cardId: number,
    commentId: number,
  ): Promise<UpdateCommentResponseDto> {
    if (await this.commentRepository.getOneComment(userId, cardId, commentId)) {
      await this.commentRepository.update(commentId, updateCommentData);
      return this.commentRepository.findOne({
        where: { id: commentId },
        select: ['content'],
      });
    }
    throw new ServiceError(
      'You are not owner of this comment or comment with requested id does not exist in this card',
    );
  }

  async deleteComment(
    userId: number,
    cardId: number,
    commentId: number,
  ): Promise<boolean> {
    if (await this.commentRepository.getOneComment(userId, cardId, commentId)) {
      await this.commentRepository.delete(commentId);
      return true;
    }
    throw new ServiceError(
      'You are not owner of this comment or comment with requested id does not exist in this card',
    );
  }
}
