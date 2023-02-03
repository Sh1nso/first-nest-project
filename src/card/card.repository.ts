import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryError } from 'src/common/errors/repository.error';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';

export class CardRepository extends Repository<Card> {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {
    super(
      cardRepository.target,
      cardRepository.manager,
      cardRepository.queryRunner,
    );
  }

  async getOneCard(userId: number, columnId: number, cardId: number) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['user', 'column'],
    });
    if (card && (await this.checkCardOwner(columnId, userId, card))) {
      return await this.cardRepository.findOne({
        where: { id: cardId },
      });
    }
    throw new RepositoryError(
      'You are not owner of with card or card with requested dose not exist',
    );
  }

  async checkCardOwner(
    columnId: number,
    userId: number,
    card: Card,
  ): Promise<boolean> {
    if (card.user.id === userId) {
      if (card.column.id === columnId) {
        return true;
      }
    }
  }
}
