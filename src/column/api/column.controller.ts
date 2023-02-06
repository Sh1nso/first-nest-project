import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ContentColumn } from 'src/entities/column.entity';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ColumnRepository } from '../column.repository';

import { ColumnService } from '../service/column.service';
import {
  CreateColumnApiDto,
  CreateColumnResponseApiDto,
  UpdateColumnApiDto,
  UpdateColumnResponseApiDto,
} from './dto';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class ColumnController {
  constructor(
    private readonly columnService: ColumnService,
    private readonly columnRepository: ColumnRepository,
  ) {}

  @Get('')
  async getAllColumns(@CurrentUser() user: User): Promise<ContentColumn[]> {
    try {
      const userId = user.id;
      return await this.columnRepository.getAllUserColumns(userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  async getOneColumn(
    @Param('id') columnId: number,
    @CurrentUser() user: User,
  ): Promise<ContentColumn> {
    try {
      const userId: number = user.id;
      return await this.columnRepository.getOneColumn(columnId, userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Post('create')
  async createColumn(
    @Body() body: CreateColumnApiDto,
    @CurrentUser() user: User,
  ): Promise<CreateColumnResponseApiDto> {
    const userId: number = user.id;
    return await this.columnService.createColumn({
      name: body.name,
      description: body.description,
      userId: userId,
    });
  }

  @Put(':id')
  async updateColumn(
    @Param('id') columnId: number,
    @Body() body: UpdateColumnApiDto,
    @CurrentUser() user: User,
  ): Promise<UpdateColumnResponseApiDto> {
    try {
      const userId: number = user.id;
      return await this.columnService.updateColumn({
        name: body.name,
        description: body.description,
        columnId: columnId,
        userId: userId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteColumn(
    @Param('id') columnId: number,
    @CurrentUser() user: User,
  ): Promise<string> {
    try {
      const userId = user.id;
      await this.columnService.deleteColumn(columnId, userId);
      return `Column with id ${columnId} was deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
