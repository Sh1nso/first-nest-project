import { Injectable } from '@nestjs/common';
import { ServiceError } from 'src/common/errors/service.error';
import { ContentComment } from 'src/entities/comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    commentData: CreateCommentDto,
    userId: number,
    cardId: number,
  ) {
    return await this.commentRepository.createComment(
      commentData,
      userId,
      cardId,
    );
  }

  async updateComment(
    updateCommentData: UpdateCommentDto,
    userId: number,
    cardId: number,
    commentId: number,
  ) {
    if (
      await this.commentRepository.checkExistCommentInCardAndOwner(
        commentId,
        cardId,
        userId,
      )
    )
      return await this.commentRepository.updateComment(
        commentId,
        updateCommentData,
      );
    throw new ServiceError(
      'You are not owner of this comment or comment with requested id does not exist in this card',
    );
  }

  async deleteComment(
    userId: number,
    cardId: number,
    commentId: number,
  ): Promise<string> {
    if (
      await this.commentRepository.checkExistCommentInCardAndOwner(
        commentId,
        cardId,
        userId,
      )
    ) {
      return await this.commentRepository.deleteComment(commentId);
    }
    throw new ServiceError(
      'You are not owner of this comment or comment with requested id does not exist in this card',
    );
  }
  async getOneComment(
    userId: number,
    cardId: number,
    commentId: number,
  ): Promise<ContentComment> {
    if (
      await this.commentRepository.checkExistCommentInCardAndOwner(
        commentId,
        cardId,
        userId,
      )
    ) {
      return await this.commentRepository.getOneComment(commentId);
    }
    throw new ServiceError(
      'You are not owner of this comment or comment with requested id does not exist in this card',
    );
  }

  async getAllUserComments(userId: number): Promise<ContentComment[]> {
    const comments = await this.commentRepository.getAllUserComments(userId);
    if (comments.length == 0) {
      throw new ServiceError("You don't have comments");
    }
    return comments;
  }
}
