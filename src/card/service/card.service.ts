import { Injectable } from '@nestjs/common';
import { ColumnRepository } from 'src/column/column.repository';

import { CardRepository } from '../card.repository';
import {
  CreateCardDto,
  ResponseCardDto,
  ResponseUpdateCardDto,
  UpdateCardDto,
} from './dto';

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly columnRepository: ColumnRepository,
  ) {}

  async updateCard(dto: UpdateCardDto): Promise<ResponseUpdateCardDto> {
    if (
      await this.cardRepository.getOneCard(dto.userId, dto.columnId, dto.cardId)
    ) {
      await this.cardRepository.update(dto.cardId, {
        name: dto.name,
        description: dto.description,
        theme: dto.theme,
      });
      return await this.cardRepository.findOne({
        where: { id: dto.cardId },
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

  async createCard(dto: CreateCardDto): Promise<ResponseCardDto> {
    if (await this.columnRepository.getOneColumn(dto.columnId, dto.userId)) {
      const newCard = await this.cardRepository.save({
        name: dto.name,
        description: dto.description,
        theme: dto.theme,
        user: dto.userId,
        column: dto.columnId,
      });

      delete newCard.user;
      delete newCard.column;
      return newCard;
    }
  }
}
