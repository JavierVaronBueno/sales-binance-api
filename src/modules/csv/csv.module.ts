// src/modules/csv/csv.module.ts
import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [SalesModule],
  controllers: [CsvController],
  providers: [CsvService],
  exports: [CsvService],
})
export class CsvModule {}