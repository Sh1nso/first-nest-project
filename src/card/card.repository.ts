import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { ContentColumn } from 'src/entities/column.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

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

  async checkCardExistAndOwner(
    columnId: number,
    userId: number,
    cardId: number,
  ): Promise<boolean> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['user', 'column'],
    });

    if (card) {
      if (card.user.id === userId) {
        if (card.column.id === columnId) {
          return true;
        }
      }
    }
  }

  async getOneCard(cardId: number) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['user', 'column'],
    });
    return card;
  }

  async getAll(columnId: number) {
    const cards = this.cardRepository.find({
      where: { column: { id: columnId } },
      relations: ['user'],
    });
    if (cards) {
      return cards;
    }
  }

  async updateCard(cardId: number, updateDto: UpdateCardDto) {
    await this.cardRepository.update(cardId, {
      name: updateDto.name,
      description: updateDto.description,
      theme: updateDto.theme,
    });
  }

  async deleteCard(userId: number, cardId: number) {
    await this.cardRepository.delete(cardId);
    return `Column with id ${cardId} has been removed`;
  }

  async createCard(
    id: ContentColumn,
    cardData: CreateCardDto,
    userId: User,
  ): Promise<CreateCardDto> {
    const newCard = await this.cardRepository.create({
      name: cardData.name,
      description: cardData.description,
      theme: cardData.theme,
      user: userId,
      column: id,
    });
    await this.cardRepository.save(newCard);
    delete newCard.user;
    delete newCard.column;
    return newCard;
  }
}
