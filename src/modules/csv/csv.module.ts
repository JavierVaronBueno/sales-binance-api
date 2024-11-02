// src/modules/csv/csv.module.ts
import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';

@Module({
  imports: [],
  controllers: [CsvController],
  providers: [CsvService],
  exports: [CsvService],
})
export class CsvModule {}