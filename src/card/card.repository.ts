import { InjectRepository } from '@nestjs/typeorm';
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

  /**
   * COMMENT
   * Вот тут плохой нейминг
   * geOneCard, но чем он отличается от стандартного findOne?
   * Тем, что подсасывает еще реляции
   * Укажи это в названии
   * getOneCardWithUserAndColumnRelations
   * А вообще, я бы такой метод убрал) ничего страшного если в двух местах будет дублирование кода
   */
  // async getOneCard(cardId: number) {
  //   const card = await this.cardRepository.findOne({
  //     where: { id: cardId },
  //     relations: ['user', 'column'],
  //   });
  //   return card;
  // }

  /**
   * COMMENT
   * то же самое что и выше
   */

  /**
   * COMMENT
   * нужно ли это в отдельный метод выносить?
   * меня смущает что тут протекает абстракция -- используется дто с уровня сервисов
   * кажется что такую логику можно писать явно в сервисе, без отдельного метода в репозитории
   */

  /**
   * COMMENT
   * Тут тоже странно какой-то особенный метод, который возвращает строчку)
   * Опять же, такую мелкую логику лучше прописать в сервисе
   * А возвращать строчку с ответом (видимо для отображения на клиенте?) ни с уровня сервисов, ни с уровня репозиториев нельзя -- это можно делать только на слое АПИ
   */
  /**
   * COMMENT
   * не надо такое выносить в отдельный метод, это лишнее, лучше эту логику в сервисе прописать
   */
}
