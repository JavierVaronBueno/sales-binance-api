import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Sales } from '../../sales/schemas/sales.schema';

@Schema()
export class Purchases extends Document {
  @Prop({ required: true }) 
  amount: number;

  @Prop({ required: true })  
  value: number;

  @Prop({ default: Date.now })  
  created_date: Date;  

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sales' }] })  
  sales: mongoose.Types.ObjectId[]; 
}

export const PurchasesSchema = SchemaFactory.createForClass(Purchases);