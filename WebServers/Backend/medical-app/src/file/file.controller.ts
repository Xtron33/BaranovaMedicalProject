import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import { Roles } from '../auth/decorator/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/role-auth.guards';
import { Datum } from '../data/entities/datum.entity';
import { DataService } from '../data/data.service';

var XLSX = require('xlsx');
var fs = require('fs');

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly dataService: DataService,
  ) {}

  @Post('upload')
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(xlsx)$/)) {
          return cb(null, false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  uploadExcel(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      var workbook = XLSX.readFile('./uploads/' + file.filename);
      var sheet_name_list = workbook.SheetNames;

      var json_conv: Datum[] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
      );

      for (const data of json_conv) {
        this.dataService.create(data);
      }

      fs.unlink('./uploads/' + file.filename, (err) => {
        if (err) {
          console.error(err);
        }
      });
      return 'sucsess';
    }
  }
}
