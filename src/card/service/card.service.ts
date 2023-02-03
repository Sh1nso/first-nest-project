import { Injectable } from '@nestjs/common';
import { ColumnRepository } from 'src/column/column.repository';

import { CardRepository } from '../card.repository';
import {
  ResponseCardDto,
  ResponseUpdateCardDto,
} from '../response/service.dto';
import { CreateCardDto } from './create.card.dto';
import { UpdateCardDto } from './update.card.dto';

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly columnRepository: ColumnRepository,
  ) {}

  async updateCard(
    cardId: number,
    columnId: number,
    userId: number,
    updateDto: UpdateCardDto,
  ): Promise<ResponseUpdateCardDto> {
    if (await this.cardRepository.getOneCard(userId, columnId, cardId)) {
      await this.cardRepository.update(cardId, {
        name: updateDto.name,
        description: updateDto.description,
        theme: updateDto.theme,
      });
      return await this.cardRepository.findOne({
        where: { id: cardId },
        select: ['description', 'name', 'theme'],
      });
    }
  }

  async deleteCard(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<boolean> {
    if (await this.cardRepository.getOneCard(userId, columnId, cardId)) {
      await this.cardRepository.delete(cardId);
      return true;
    }
  }

  async createCard(
    columnId,
    card: CreateCardDto,
    userId,
  ): Promise<ResponseCardDto> {
    if (await this.columnRepository.getOneColumn(columnId, userId)) {
      const newCard = this.cardRepository.create({
        name: card.name,
        description: card.description,
        theme: card.theme,
        user: userId,
        column: columnId,
      });
      await this.cardRepository.save(newCard);

      delete newCard.user;
      delete newCard.column;
      return newCard;
    }
  }
}
