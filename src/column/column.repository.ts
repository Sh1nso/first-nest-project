import { ContentColumn } from 'src/entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryError } from 'src/common/errors/repository.error';

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
    if (columns) {
      return columns;
    }
    throw new RepositoryError(`You don't have columns`);
  }

  async getOneColumn(columnId: number, userId: number) {
    const column = await this.columnRepository.findOne({
      where: { id: columnId },
      relations: ['user'],
    });

    if (column && (await this.checkColumnOwner(userId, column))) {
      return column;
    }
    throw new RepositoryError(
      `You are not owner of this column or column with requested id does not exist`,
    );
  }

  async checkColumnOwner(
    userId: number,
    column: ContentColumn,
  ): Promise<boolean> {
    console.log(column);
    if (column.user.id === userId) {
      return true;
    }
  }
}
