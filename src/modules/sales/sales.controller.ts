import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sales } from './schemas/sales.schema';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // Endpoint para crear una venta
  @Post('upload')
  async createSale(
    @Body('amount') amount: number,
    @Body('value') value: number,
    @Body('purchases') purchasesIds: string[],
  ): Promise<Sales> {
    return this.salesService.createSale(amount, value, purchasesIds);
  }

  // Endpoint para obtener todas las ventas
  @Get('get')
  async getAllSales(): Promise<Sales[]> {
    return this.salesService.getAllSales();
  }
}