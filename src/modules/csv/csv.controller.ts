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
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    try {
      // Asegúrate de que el archivo esté en el formato correcto
      if (!file) {
        throw new Error('No file uploaded');
      }

      // Procesa el archivo CSV utilizando el método parseCsv
      const results = await this.csvService.parseCsv(file.path);

      // Retorna los resultados del archivo CSV procesado
      return {
        message: 'File processed successfully',
        data: results,
      };
    } catch (error) {
      return { message: 'Error processing file', error: error.message };
    }
  }
}
