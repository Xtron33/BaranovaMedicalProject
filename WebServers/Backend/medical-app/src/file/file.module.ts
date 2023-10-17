import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DataController } from '../data/data.controller';
import { DataService } from '../data/data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Datum } from '../data/entities/datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Datum])],
  controllers: [FileController, DataController],
  providers: [FileService, DataService],
})
export class FileModule {}
