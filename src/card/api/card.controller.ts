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
import { Card } from 'src/entities/card.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CardRepository } from '../card.repository';
import {
  ResponseApiCardDto,
  ResponseUpdateApiCardDto,
} from '../response/api.dto';
import { CardService } from '../service/card.service';
import { CreateApiCardDto } from './create.card.dto';
import { UpdateApiCardDto } from './update.card.dto';

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
  ): Promise<Card> {
    try {
      const userId: number = request.user.id;
      return await this.cardRepository.getOneCard(userId, columnId, cardId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
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
      throw new HttpException(error, HttpStatus.FORBIDDEN);
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
      throw new HttpException(error, HttpStatus.FORBIDDEN);
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
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
