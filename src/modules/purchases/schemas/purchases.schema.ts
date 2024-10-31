// src/modules/purchases/schemas/purchases.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Sales } from '../../sales/schemas/sales.schema';

@Schema()
export class Purchases extends Document {
  @Prop()
  cost: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Sales' }])
  sales: mongoose.Types.ObjectId[];  // Relación con el modelo Sales
}

export const PurchasesSchema = SchemaFactory.createForClass(Purchases);
