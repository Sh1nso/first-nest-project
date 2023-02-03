import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryError } from 'src/common/errors/repository.error';
import { ContentComment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

export class CommentRepository extends Repository<ContentComment> {
  constructor(
    @InjectRepository(ContentComment)
    private commentRepository: Repository<ContentComment>,
  ) {
    super(
      commentRepository.target,
      commentRepository.manager,
      commentRepository.queryRunner,
    );
  }

  async getAllComments(userId: number): Promise<ContentComment[]> {
    const comments = await this.commentRepository.find({
      where: { user: { id: userId } },
    });
    if (comments.length != 0) {
      return comments;
    }
    throw new RepositoryError(`You don't have comments`);
  }

  async getOneComment(userId: number, cardId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'card'],
    });
    if (comment && this.checkCommentOwner(cardId, userId, comment)) {
      return comment;
    }
    throw new RepositoryError('Comment does not exist or you are not owner');
  }

  async checkCommentOwner(
    cardId: number,
    userId: number,
    card: ContentComment,
  ): Promise<boolean> {
    if (card.user.id === userId) {
      if (card.card.id === cardId) {
        return true;
      }
    }
  }
}
