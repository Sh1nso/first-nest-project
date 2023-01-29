import { InjectRepository } from '@nestjs/typeorm';
import { ContentComment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  async checkExistCommentInCardAndOwner(
    commentId: number,
    cardId: number,
    userId: number,
  ): Promise<boolean> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['card', 'user'],
    });
    if (comment) {
      if (comment.card.id === cardId && comment.user.id === userId) {
        return true;
      }
    }
  }

  async updateComment(commentId: number, updateData: UpdateCommentDto) {
    await this.commentRepository.update(commentId, updateData);
    return this.commentRepository.findOne({ where: { id: commentId } });
  }

  async createComment(
    commentData: CreateCommentDto,
    userId,
    cardId,
  ): Promise<ContentComment> {
    const newComment = await this.commentRepository.create({
      content: commentData.content,
      user: userId,
      card: cardId,
    });
    await this.commentRepository.save(newComment);
    return newComment;
  }

  async deleteComment(commentId: number): Promise<string> {
    await this.commentRepository.delete(commentId);
    return `Comment with id ${commentId} was deleted`;
  }

  async getOneComment(commentId: number): Promise<ContentComment> {
    return await this.commentRepository.findOne({ where: { id: commentId } });
  }

  async getAllUserComments(userId: number): Promise<ContentComment[]> {
    const comments = await this.commentRepository.find({
      where: { user: { id: userId } },
      relations: ['card'],
    });
    return comments;
  }
}
