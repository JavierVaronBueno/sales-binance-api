import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CsvModule } from './modules/csv/csv.module';

@Module({
  imports: [DatabaseModule, CsvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
