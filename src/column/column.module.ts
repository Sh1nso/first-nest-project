import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentColumn } from 'src/entities/column.entity';
import { ColumnController } from './column.controller';
import { ColumnRepository } from './column.repository';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentColumn])],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository],
  exports: [ColumnService],
})
export class ColumnModule {}
