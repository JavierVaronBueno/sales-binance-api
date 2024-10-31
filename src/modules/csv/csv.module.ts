// src/modules/csv/csv.module.ts
import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';

@Module({
  providers: [CsvService],
  exports: [CsvService], // Exporta si se va a usar en otros módulos
})
export class CsvModule {}
