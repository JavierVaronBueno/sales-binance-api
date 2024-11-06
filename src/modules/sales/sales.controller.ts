import { Controller, Post, Get, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sales } from './schemas/sales.schema';
import { Types } from 'mongoose'; // Importa `Types` de mongoose para usar `ObjectId`

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  
  @Post('upload')
  async createSale(
    @Body('amount') amount: number,
    @Body('value') value: number,
    @Body('purchases') purchasesIds: string[],
  ): Promise<Sales> {
    const purchases = purchasesIds.map(id => new Types.ObjectId(id));

    const saleData = {
      amount,
      value,
      purchases,
    };

    return this.salesService.createSale(saleData);
  }

  @Get('get')
  async getAllSales(): Promise<Sales[]> {
    return this.salesService.getAllSales();
  }
}