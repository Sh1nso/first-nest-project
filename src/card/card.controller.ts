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
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ResponseCard } from './response/response';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':id/card/:cardId')
  async getOneCard(
    @Param('id') columnId: number,
    @Param('cardId') cardId: number,
    @Req() request,
  ): Promise<ResponseCard> {
    try {
      const userId: number = request.user.id;
      return await this.cardService.getOneCard(cardId, userId, columnId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Get(':id/cards')
  async getAllCards(@Param('id') id: number): Promise<Card[]> {
    try {
      return await this.cardService.getAll(id);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
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
      return await this.cardService.deleteCard(userId, columnId, cardId);
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
    @Body() updateData: UpdateCardDto,
  ): Promise<Card> {
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
    @Body() createCard: CreateCardDto,
    @Req() request,
  ): Promise<Card> {
    try {
      const user = request.user.id;
      return await this.cardService.createCard(id, createCard, user);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }
}
