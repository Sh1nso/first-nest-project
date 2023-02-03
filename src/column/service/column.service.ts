import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './create.column.dto';
import { UpdateColumnDto } from './update.column.dto';
import { ServiceError } from 'src/common/errors/service.error';
import { ColumnRepository } from '../column.repository';
import {
  CreateColumnResponseDto,
  UpdateColumnResponseDto,
} from '../response/service.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  async createColumn(
    columnData: CreateColumnDto,
    user,
  ): Promise<CreateColumnResponseDto> {
    const newPost = this.columnRepository.create({
      name: columnData.name,
      description: columnData.description,
      user: user.id,
    });
    await this.columnRepository.save(newPost);
    return newPost;
  }

  async updateColumn(
    columnId: number,
    columnData: UpdateColumnDto,
    userId: number,
  ): Promise<UpdateColumnResponseDto> {
    if (await this.columnRepository.getOneColumn(columnId, userId)) {
      await this.columnRepository.update(columnId, {
        name: columnData.name,
        description: columnData.description,
      });
      const updatedColumn = await this.columnRepository.findOne({
        where: { id: columnId },
        select: ['description', 'name'],
      });
      return updatedColumn;
    }
    throw new ServiceError(
      'You are not owner of this column or column with requested id does not exist',
    );
  }

  async deleteColumn(columnId: number, userId: number): Promise<boolean> {
    if (await this.columnRepository.getOneColumn(columnId, userId)) {
      await this.columnRepository.delete(columnId);
      return true;
    }
    throw new ServiceError(
      'You are not owner of this column or column with requested id does not exist',
    );
  }
}
