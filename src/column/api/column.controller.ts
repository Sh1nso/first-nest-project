import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContentColumn } from 'src/entities/column.entity';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ColumnRepository } from '../column.repository';
import {
  CreateColumnResponseApiDto,
  UpdateColumnResponseApiDto,
} from '../response/api.dto';
import { ColumnService } from '../service/column.service';
import { CreateColumnApiDto } from './create.column.dto';
import { UpdateColumnApiDto } from './update.column.dto';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class ColumnController {
  constructor(
    private readonly columnService: ColumnService,
    private readonly columnRepository: ColumnRepository,
  ) {}

  @Get('')
  async getAllColumns(@Req() request): Promise<ContentColumn[]> {
    try {
      const userId = request.user.id;
      return await this.columnRepository.getAllUserColumns(userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  async getOneColumn(
    @Param('id') columnId: number,
    @Req() request,
  ): Promise<ContentColumn> {
    try {
      const userId = request.user.id;
      return await this.columnRepository.getOneColumn(columnId, userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Post('create')
  async createColumn(
    @Body() columnDto: CreateColumnApiDto,
    @Req() request,
  ): Promise<CreateColumnResponseApiDto> {
    const user = request.user;
    return await this.columnService.createColumn(columnDto, user);
  }

  @Put(':id')
  async updateColumn(
    @Param('id') id: number,
    @Body() updateDto: UpdateColumnApiDto,
    @Req() request,
  ): Promise<UpdateColumnResponseApiDto> {
    try {
      const user = request.user.id;
      return await this.columnService.updateColumn(id, updateDto, user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async deleteColumn(
    @Param('id') columnId: number,
    @Req() request,
  ): Promise<string> {
    try {
      const user = request.user.id;
      await this.columnService.deleteColumn(columnId, user);
      return `Column with id ${columnId} was deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
