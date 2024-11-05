// src/modules/sales/sales.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales } from './schemas/sales.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sales.name) private salesModel: Model<Sales>) {}

  // Método para crear una venta
  async createSale(amount: number, value: number, purchasesIds: string[]): Promise<Sales> {
    const newSale = new this.salesModel({ amount, value, purchases: purchasesIds });
    return newSale.save();
  }

  // Método para obtener todas las ventas
  async getAllSales(): Promise<Sales[]> {
    return this.salesModel.find().exec();
  }
}