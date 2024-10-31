import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  organizeFilesByPurchase(purchaseId: string, files: string[]): void {
    const dirPath = path.join(__dirname, '../../purchases', purchaseId);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    files.forEach(file => fs.copyFileSync(file, path.join(dirPath, path.basename(file))));
  }
}
