import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.csvService.parseCsv(file.buffer);
      return result; 
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
        errors: error.errors || [],
      };
    }
  }
  
}