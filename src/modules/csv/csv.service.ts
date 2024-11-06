import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser'; // Cambiado aquí
import { Readable } from 'stream';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class CsvService {
  constructor(private readonly salesService: SalesService) {}

  async parseCsv(buffer: Buffer): Promise<{ message: string; errors?: any[]; data?: any[] }> {
    try {
      const { message, data, errors } = await this.processCsv(buffer);
      
      if (errors && errors.length > 0) {
        return { message, errors };
      }

      const saveResult = await this.saveCsv(data);
  
      return { message: saveResult.message, data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async processCsv(buffer: Buffer): Promise<{ message: string; errors?: any[]; data?: any[]; error?: string }> {
    const results = [];
    const errors = [];
    let lineNumber = 0;

    const bomFreeBuffer = buffer.toString('utf8').replace(/^\uFEFF/, '');
    const stream = Readable.from(bomFreeBuffer);

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser({ separator: ';' }))
        .on('data', (data) => {
          lineNumber++;
          const sale = {
            amount: parseFloat(data.amount),
            value: parseFloat(data.value),
          };

          if (isNaN(sale.amount) || isNaN(sale.value)) {
            errors.push({
              line: lineNumber,
              data,
              error: 'Invalid data: amount or value is not a valid number.',
            });
          } else {
            results.push(sale);
          }
        })
        .on('end', () => {
          if (errors.length > 0) {
            resolve({
              message: 'Error processing CSV file',
              errors,
            });
          } else {
            resolve({ message: 'CSV processed successfully', data: results });
          }
        })
        .on('error', (error) => {
          resolve({ message: 'Error reading CSV file', error: error.message });
        });
    });
  }

  async saveCsv(sales: { amount: number; value: number }[]): Promise<{ message: string }> {
    try {
      for (const sale of sales) {
        await this.salesService.createSale(sale);
      }
      return { message: 'Sales saved successfully' };
    } catch (error) {
      throw new Error('Error saving data to the database: ' + error.message);
    }
  }

}