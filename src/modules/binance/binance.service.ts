import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BinanceService {
  constructor(private httpService: HttpService) {}

  async getPurchaseReport(): Promise<any> {
    const apiUrl = 'https://api.binance.com/api/v3/trades';
    const response = await this.httpService.get(apiUrl).toPromise();
    return response.data;
  }
}
