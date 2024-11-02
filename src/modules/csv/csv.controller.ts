import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' debe coincidir con el nombre en el body
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvData = await this.csvService.parseCsv(file.buffer);
    return { message: 'File processed successfully', data: csvData };
  }
}