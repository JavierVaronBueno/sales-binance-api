// src/modules/sales/sales.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales } from './schemas/sales.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sales.name) private salesModel: Model<Sales>) {}

  async createSale(saleData: Partial<Sales>): Promise<Sales> {
    const newSale = new this.salesModel(saleData);
    return newSale.save();
  }

  async getAllSales(): Promise<Sales[]> {
    return this.salesModel.find().exec();
  }
}