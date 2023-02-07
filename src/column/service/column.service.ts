import { Injectable } from '@nestjs/common';
import { ColumnRepository } from '../column.repository';
import {
  CreateColumnDto,
  CreateColumnResponseDto,
  UpdateColumnDto,
  UpdateColumnResponseDto,
} from './dto';

@Injectable()
export class ColumnService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  async createColumn(dto: CreateColumnDto): Promise<CreateColumnResponseDto> {
    const newColumn = await this.columnRepository.save({
      name: dto.name,
      description: dto.description,
      userId: dto.userId,
    });
    return newColumn;
  }

  async updateColumn(dto: UpdateColumnDto): Promise<UpdateColumnResponseDto> {
    if (await this.columnRepository.getOneColumn(dto.columnId, dto.userId)) {
      await this.columnRepository.update(dto.columnId, {
        name: dto.name,
        description: dto.description,
      });
      const updatedColumn = await this.columnRepository.findOne({
        where: { id: dto.columnId },
        select: ['description', 'name'],
      });
      return updatedColumn;
    }
  }

  async deleteColumn(columnId: number, userId: number): Promise<boolean> {
    if (await this.columnRepository.getOneColumn(columnId, userId)) {
      await this.columnRepository.delete(columnId);
      return true;
    }
  }
}
