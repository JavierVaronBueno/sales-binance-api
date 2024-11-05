import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Purchases } from '../../purchases/schemas/purchases.schema';

@Schema()
export class Sales extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  value: number;

  @Prop({ default: Date.now })
  created_date: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchases' }] })
  purchases: mongoose.Types.ObjectId[];
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
