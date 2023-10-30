import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { CreateAnalyzDto } from './dto/create-analyz.dto';
import { Repository } from 'typeorm';
import { Analyz } from './entities/analyz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Observable } from 'rxjs';
@Injectable()
export class AnalyzService {
  constructor(
    @Inject('analyz_microservi') private readonly client: ClientKafka,
    @InjectRepository(Analyz)
    private readonly analyzRepository: Repository<Analyz>,
  ) {}

  train() {
    return this.client.emit('train', 'start_train');
  }

  predicate(createAnalyzDto: CreateAnalyzDto) {
    let id = crypto.randomUUID();
    return this.client.send('predicate', {
      key: id,
      value: createAnalyzDto,
    });
  }

  createAnalyz(createAnalyzDto: CreateAnalyzDto, id: number) {
    const newAnalyz = {
      firstname: createAnalyzDto.firstname,
      lastname: createAnalyzDto.lastname,
      middlename: createAnalyzDto.middlename,
      gender: createAnalyzDto.gender,
      hormonalBackground: createAnalyzDto.hormonalBackground,
      cardivascularSystem: createAnalyzDto.cardivascularSystem,
      genitourinarySystem: createAnalyzDto.genitourinarySystem,
      gastrointestinalTract: createAnalyzDto.gastrointestinalTract,
      angiopathy: createAnalyzDto.angiopathy,
      tumorsOtherLocalization: createAnalyzDto.tumorsOtherLocalization,
      RBC: createAnalyzDto.RBC,
      MCV: createAnalyzDto.MCV,
      RDW: createAnalyzDto.RDW,
      RDWa: createAnalyzDto.RDWa,
      HCT: createAnalyzDto.HCT,
      PLT: createAnalyzDto.PLT,
      MPV: createAnalyzDto.MPV,
      PDW: createAnalyzDto.PDW,
      PCT: createAnalyzDto.PCT,
      LPCR: createAnalyzDto.LPCR,
      WBC: createAnalyzDto.WBC,
      HGB: createAnalyzDto.HGB,
      MCH: createAnalyzDto.MCH,
      MCHC: createAnalyzDto.MCHC,
      LYM: createAnalyzDto.LYM,
      GRAN: createAnalyzDto.GRAN,
      MID: createAnalyzDto.MID,
      LIMProcent: createAnalyzDto.LIMProcent,
      GRAProcent: createAnalyzDto.GRAProcent,
      MIDProcent: createAnalyzDto.MIDProcent,
      NEUT: createAnalyzDto.NEUT,
      BO: createAnalyzDto.BO,
      BASO: createAnalyzDto.BASO,
      MON: createAnalyzDto.MON,
      Ultrasound: createAnalyzDto.Ultrasound,
      metastasa: createAnalyzDto.metastasa,
      answer: createAnalyzDto.answer,
      user: {
        id,
      },
    };

    return this.analyzRepository.save(newAnalyz);
  }

  getAllByUser(id: number, page: number, limit: number) {
    return this.analyzRepository.findAndCount({
      where: {
        user: { id },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
  getAll(page: number, limit: number) {
    return this.analyzRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  getById(id: number, idObject: number) {
    return this.analyzRepository.findOne({
      where: {
        id: idObject,
        user: { id },
      },
    });
  }

  async getColumnNames() {
    const data = this.analyzRepository.metadata.propertiesMap;
    let newData = [];
    for (let i in data) {
      newData.push({ id: data[i] });
    }

    return newData;
  }
}
