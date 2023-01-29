import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Put,
  Param,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServiceError } from 'src/common/errors/service.error';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column-dto';
import { UpdateColumnDto } from './dto/update-column-dto';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get('')
  async getAllColumns(@Req() request) {
    try {
      const userId = request.user.id;

      return await this.columnService.getAllUserColumns(userId);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
      throw error;
    }
  }

  @Get(':id')
  async getOneColumn(@Param('id') id: number, @Req() request) {
    try {
      const user = request.user.id;
      return await this.columnService.getOneColumn(id, user);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }

  @Post('create')
  async createColumn(@Body() columnDto: CreateColumnDto, @Req() request) {
    const user = request.user;
    return await this.columnService.createColumn(columnDto, user);
  }

  @Put(':id')
  async updateColumn(
    @Param('id') id: number,
    @Body() updateDto: UpdateColumnDto,
    @Req() request,
  ) {
    try {
      const user = request.user.id;
      return await this.columnService.updateColumn(id, updateDto, user);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new ForbiddenException(error.error);
      }
    }
  }

  @Delete(':id')
  async deleteColumn(@Param('id') id: number, @Req() request) {
    try {
      const user = request.user.id;
      return await this.columnService.deleteColumn(id, user);
    } catch (error) {
      if (error instanceof ServiceError) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }
  }
}
