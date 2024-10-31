// src/modules/purchases/purchases.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchases, PurchasesSchema } from './schemas/purchases.schema';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Purchases.name, schema: PurchasesSchema }]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
