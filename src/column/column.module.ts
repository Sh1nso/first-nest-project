import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contentColumn } from 'src/entitys/column.entity';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([contentColumn]),],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports:[ColumnService]
})
export class ColumnModule {}
