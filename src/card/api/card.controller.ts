import {
  Controller,
  Get,
  UseGuards,
  Post,
  Param,
  Body,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Card } from 'src/entities/card.entity';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CardRepository } from '../card.repository';
import { CardService } from '../service/card.service';
import {
  CreateApiCardDto,
  ResponseApiCardDto,
  ResponseUpdateApiCardDto,
  UpdateApiCardDto,
} from './dto';

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
    @CurrentUser() user: User,
  ): Promise<Card> {
    try {
      const userId: number = user.id;
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
    @CurrentUser() user: User,
  ): Promise<string> {
    try {
      const userId: number = user.id;
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
    @CurrentUser() user: User,
    @Body() body: UpdateApiCardDto,
  ): Promise<ResponseUpdateApiCardDto> {
    try {
      const userId: number = user.id;
      return await this.cardService.updateCard({
        name: body.name,
        description: body.description,
        theme: body.theme,
        cardId: cardId,
        columnId: columnId,
        userId: userId,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Post(':id/card')
  async createCard(
    @Param('id') columnId,
    @Body() body: CreateApiCardDto,
    @CurrentUser() user: User,
  ): Promise<ResponseApiCardDto> {
    try {
      const userId: number = user.id;
      return await this.cardService.createCard({
        name: body.name,
        description: body.description,
        theme: body.theme,
        columnId: columnId,
        userId: userId,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
