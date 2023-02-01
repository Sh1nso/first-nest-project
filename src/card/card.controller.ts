import {
  Controller,
  Get,
  UseGuards,
  Post,
  Param,
  Body,
  Req,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServiceError } from 'src/common/errors/service.error';
import { Card } from 'src/entities/card.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CardRepository } from './card.repository';
import { CardService } from './card.service';
import { CreateApiCardDto } from './dto/create-card.dto';
import { UpdateApiCardDto } from './dto/update-card.dto';
import {
  ResponseApiCardDto,
  ResponseCardDto,
  ResponseUpdateApiCardDto,
} from './response/response';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly cardRepository: CardRepository,
  ) {}

  @Get(':id/card/:cardId')
  async getOneCard(
    @Param('id') columnId: number,
    @Param('cardId') cardId: number,
    @Req() request,
  ): Promise<ResponseCardDto> {
    try {
      const userId: number = request.user.id;
      /**
        * COMMENT
        * Логику по доступам к данным лучше скрыть в репозитории
        * Сделай в репозитории метод getOneCard, чтобы он принимал userId, columnId и cardId
        * В контроллере лучше не прописывать так много логики по доступам к данным, это я забыл тебе сказать сори)
      */
      if (
        await this.cardRepository.checkCardExistAndOwner(
          columnId,
          userId,
          cardId,
        )
      ) {
        const card = await this.cardRepository.findOne({
          where: { id: cardId },
        });
        delete card.column;
        delete card.user;
        return card;
      }
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Get(':id/cards')
  async getAllCards(@Param('id') columnId: number): Promise<Card[]> {
    try {
      const cards = this.cardRepository.find({
        where: { column: { id: columnId } },
        relations: ['user'],
      });
      if (cards) {
        return cards;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete(':columnId/card/:cardId')
  async deleteCard(
    @Param('columnId') columnId,
    @Param('cardId') cardId,
    @Req() request,
  ): Promise<string> {
    try {
      const userId = request.user.id;
      await this.cardService.deleteCard(userId, columnId, cardId);
      return `Card with id ${cardId} was deleted`;
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Put(':columnId/card/:cardId')
  async updateCard(
    @Param('columnId') columnId,
    @Param('cardId') cardId,
    @Req() request,
    @Body() updateData: UpdateApiCardDto,
  ): Promise<ResponseUpdateApiCardDto> {
    try {
      const userId = request.user.id;
      return await this.cardService.updateCard(
        cardId,
        columnId,
        userId,
        updateData,
      );
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Post(':id/card')
  async createCard(
    @Param('id') id,
    @Body() createDataCard: CreateApiCardDto,
    @Req() request,
  ): Promise<ResponseApiCardDto> {
    try {
      const user = request.user.id;
      return await this.cardService.createCard(id, createDataCard, user);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }
}
