import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser'; // Cambiado aquí
import { Readable } from 'stream';

@Injectable()
export class CsvService {
  async parseCsv(buffer: Buffer): Promise<any[]> {
    console.log('Buffer size:', buffer.length); // Muestra el tamaño del buffer
    console.log('Buffer content:', buffer.toString('utf8', 0, 100)); // Muestra los primeros 100 caracteres del buffer

    const results = [];
    return new Promise((resolve, reject) => {
      const stream = Readable.from(buffer); // Crea un flujo a partir del buffer
      stream
        .pipe(csvParser({ separator: ';' })) // Usa el separador punto y coma
        .on('data', (data) => {
          console.log('Received data:', data); // Muestra cada línea de datos recibida
          results.push(data);
        })
        .on('end', () => {
          console.log('Parsed results:', results); // Muestra los resultados al final
          resolve(results);
        })
        .on('error', (error) => {
          console.error('Error while parsing:', error); // Muestra cualquier error que ocurra
          reject(error);
        });
    });
  }
}