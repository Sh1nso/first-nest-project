import { ContentColumn } from 'src/entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column-dto';
import { UpdateColumnDto } from './dto/update-column-dto';

export class ColumnRepository extends Repository<ContentColumn> {
  constructor(
    @InjectRepository(ContentColumn)
    private columnRepository: Repository<ContentColumn>,
  ) {
    super(
      columnRepository.target,
      columnRepository.manager,
      columnRepository.queryRunner,
    );
  }

  async getAllUserColumns(userId: number): Promise<ContentColumn[]> {
    const columns = await this.columnRepository.find({
      where: { user: { id: userId } },
    });
    return columns;
  }

  async getOneColumn(id: number): Promise<ContentColumn> {
    const column = await this.columnRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return column;
  }

  async createColumn(
    columnData: CreateColumnDto,
    user,
  ): Promise<ContentColumn> {
    const newPost = await this.columnRepository.create({
      name: columnData.name,
      description: columnData.description,
      user: user.id,
    });
    await this.columnRepository.save(newPost);
    return newPost;
  }

  async updateColumn(
    id: number,
    columnData: UpdateColumnDto,
  ): Promise<ContentColumn> {
    await this.columnRepository.update(id, {
      name: columnData.name,
      description: columnData.description,
    });
    const updatedColumn = await this.columnRepository.findOne({
      where: { id },
    });
    return updatedColumn;
  }

  async deleteColumn(id: number) {
    await this.columnRepository.delete(id);
    return `Column with id ${id} has been removed`;
  }
}
