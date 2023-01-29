import { Injectable } from '@nestjs/common';
import { ContentColumn } from 'src/entities/column.entity';
import { CreateColumnDto } from './dto/create-column-dto';
import { UpdateColumnDto } from './dto/update-column-dto';
import { ServiceError } from 'src/common/errors/service.error';
import { ColumnRepository } from './column.repository';

@Injectable()
export class ColumnService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  async getAllUserColumns(userId: number): Promise<ContentColumn[]> {
    const columns = await this.columnRepository.getAllUserColumns(userId);
    if (columns.length == 0) {
      throw new ServiceError("You don't have a column");
    }
    return columns;
  }

  async getOneColumn(id: number, userId: number): Promise<ContentColumn> {
    const column = await this.columnRepository.getOneColumn(id);

    if (column) {
      if (column.user.id === userId) {
        return column;
      }
      throw new ServiceError('You are not the owner');
    }
    throw new ServiceError('Column not found');
  }

  async createColumn(
    columnData: CreateColumnDto,
    user,
  ): Promise<ContentColumn> {
    const newPost = await this.columnRepository.createColumn(columnData, user);
    await this.columnRepository.save(newPost);
    return newPost;
  }

  async updateColumn(
    id: number,
    columnData: UpdateColumnDto,
    userId: number,
  ): Promise<ContentColumn> {
    if (await this.checkExistAndOwner(id, userId)) {
      await this.columnRepository.updateColumn(id, {
        name: columnData.name,
        description: columnData.description,
      });
      const updatedColumn = await this.columnRepository.findOne({
        where: { id },
      });
      return updatedColumn;
    }
  }

  async deleteColumn(id: number, userId: number): Promise<string> {
    if (await this.checkExistAndOwner(id, userId)) {
      await this.columnRepository.delete(id);
      return `Column with id ${id} has been removed`;
    }
  }

  async checkExistAndOwner(columnId: number, userId: number): Promise<boolean> {
    if (await this.getOneColumn(columnId, userId)) {
      return true;
    }
  }
}
