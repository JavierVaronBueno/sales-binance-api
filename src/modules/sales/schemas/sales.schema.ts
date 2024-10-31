// src/modules/sales/schemas/sales.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Purchases } from '../../purchases/schemas/purchases.schema';

@Schema()
export class Sales extends Document {
  @Prop()
  price: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchases' }])
  purchases: mongoose.Types.ObjectId[];  // Relación con el modelo Purchases
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
