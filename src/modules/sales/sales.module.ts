// src/modules/sales/sales.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sales, SalesSchema } from './schemas/sales.schema';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sales.name, schema: SalesSchema }]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService], // Exporta si se necesita en otros módulos
})
export class SalesModule {}
