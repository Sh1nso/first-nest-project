import { Injectable } from '@nestjs/common';
import { ColumnService } from 'src/column/column.service';
import { ServiceError } from 'src/common/errors/service.error';
import { Card } from 'src/entities/card.entity';
import { CardRepository } from './card.repository';
import { UpdateCardDto } from './dto/update-card.dto';
import { ResponseCard } from './response/response';

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly columnRepository: ColumnService,
  ) {}

  /**
    * COMMENT
    * Слушай, а давай все методы на получение данных из сервисов выпилим? В сервисах получение данных лучше не прописывать, это лишняя нагрузка на них
    * Пусть контроллеры ходят в репозитории и сами берут что надо
    * А в сервисах оставим только то, что "мутирует" данные и содержит логику (создание, обновление и удаление)
  */
  async getOneCard(
    cardId: number,
    userId: number,
    columnId: number,
  ): Promise<ResponseCard> {
    if (
      await this.cardRepository.checkCardExistAndOwner(columnId, userId, cardId)
    ) {
      const card = await this.cardRepository.getOneCard(cardId);
      delete card.column;
      delete card.user;
      return card;
    }
    throw new ServiceError(
      'Card/column does not exist or you are not owner of this card ',
    );
  }

  async getAll(columnId: number): Promise<Card[]> {
    const cards = await this.cardRepository.getAll(columnId);
    if (cards.length == 0) {
      throw new ServiceError('You dont have a card');
    }
    return cards;
  }

  async updateCard(
    cardId: number,
    columnId: number,
    userId: number,
    updateDto: UpdateCardDto,
  ): Promise<Card> {
    if (
      await this.cardRepository.checkCardExistAndOwner(columnId, userId, cardId)
    ) {
      await this.cardRepository.update(cardId, {
        name: updateDto.name,
        description: updateDto.description,
        theme: updateDto.theme,
      });
      return await this.cardRepository.getOneCard(cardId);
    }
    throw new ServiceError(
      'Card/column does not exist or you are not owner of this card ',
    );
  }

  async deleteCard(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<string> {
    if (
      await this.cardRepository.checkCardExistAndOwner(columnId, userId, cardId)
    ) {
      await this.cardRepository.delete(cardId);
      return `Column with id ${cardId} has been removed`;
    }
    throw new ServiceError(
      'Card/column does not exist or you are not owner of this card ',
    );
  }

  async createCard(columnId, cardData, userId): Promise<Card> {
    if (await this.checkColumnOwnCard(userId, columnId)) {
      const newCard = await this.cardRepository.create({
        name: cardData.name,
        description: cardData.description,
        theme: cardData.theme,
        user: userId,
        column: columnId,
      });
      await this.cardRepository.save(newCard);
      delete newCard.user;
      delete newCard.column;
      return newCard;
    }
    throw new ServiceError('You are not owner of this column');
  }

  async checkColumnOwnCard(userId: number, columnId: number): Promise<boolean> {
    if (await this.columnRepository.checkExistAndOwner(columnId, userId)) {
      return true;
    }
  }
}
