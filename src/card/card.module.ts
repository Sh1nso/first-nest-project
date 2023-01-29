import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { ColumnModule } from 'src/column/column.module';
import { CardRepository } from './card.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), ColumnModule],
  providers: [CardService, CardRepository],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
