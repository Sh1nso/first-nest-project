import { Injectable } from '@nestjs/common';
import { ColumnService } from 'src/column/column.service';
import { ServiceError } from 'src/common/errors/service.error';
import { ContentColumn } from 'src/entities/column.entity';
import { User } from 'src/entities/user.entity';
import { CardRepository } from './card.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ResponseCardDto } from './response/response';

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
  // async getOneCard(
  //   cardId: number,
  //   userId: number,
  //   columnId: number,
  // ): Promise<ResponseCardDto> {
  //   if (
  //     await this.cardRepository.checkCardExistAndOwner(columnId, userId, cardId)
  //   ) {
  //     const card = await this.cardRepository.getOneCard(cardId);
  //     delete card.column;
  //     delete card.user;
  //     return card;
  //   }
  // }

  async updateCard(
    cardId: number,
    columnId: number,
    userId: number,
    updateDto: UpdateCardDto,
  ): Promise<UpdateCardDto> {
    if (
      await this.cardRepository.checkCardExistAndOwner(columnId, userId, cardId)
    ) {
      await this.cardRepository.update(cardId, {
        name: updateDto.name,
        description: updateDto.description,
        theme: updateDto.theme,
      });
      return await this.cardRepository.findOne({ where: { id: cardId } });
    }
    throw new ServiceError(
      'Card/column does not exist or you are not owner of this card ',
    );
  }

  async deleteCard(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<boolean> {
    if (
      await this.cardRepository.checkCardExistAndOwner(columnId, userId, cardId)
    ) {
      await this.cardRepository.delete(cardId);
      return true;
    }
    throw new ServiceError(
      'Card/column does not exist or you are not owner of this card ',
    );
  }

  async createCard(
    column: ContentColumn,
    card: CreateCardDto,
    user: User,
  ): Promise<ResponseCardDto> {
    if (await this.checkColumnOwnCard(user, column)) {
      const newCard = this.cardRepository.create({
        name: card.name,
        description: card.description,
        theme: card.theme,
        user: user,
        column: column,
      });
      await this.cardRepository.save(newCard);

      delete newCard.user;
      delete newCard.column;
      return newCard;
    }
  }

  async checkColumnOwnCard(userId, columnId): Promise<boolean> {
    if (await this.columnRepository.checkExistAndOwner(columnId, userId)) {
      return true;
    }
    throw new ServiceError(
      'Card/column does not exist or you are not owner of this card ',
    );
  }
}
