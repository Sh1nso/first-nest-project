import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentColumn } from 'src/entities/column.entity';
import { ColumnController } from './api/column.controller';
import { ColumnRepository } from './column.repository';
import { ColumnService } from './service/column.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentColumn])],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository],
  exports: [ColumnRepository],
})
export class ColumnModule {}
