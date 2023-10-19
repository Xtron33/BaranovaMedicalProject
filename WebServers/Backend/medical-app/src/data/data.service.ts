import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Repository } from 'typeorm';
import { Datum } from './entities/datum.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Datum)
    private readonly dataRepository: Repository<Datum>,
  ) {}

  async create(createDatumDto: CreateDatumDto) {
    const newDatum = {
      gender: createDatumDto.gender,
      hormonalBackground: createDatumDto.hormonalBackground,
      cardivascularSystem: createDatumDto.cardivascularSystem,
      genitourinarySystem: createDatumDto.genitourinarySystem,
      gastrointestinalTract: createDatumDto.gastrointestinalTract,
      angiopathy: createDatumDto.angiopathy,
      tumorsOtherLocalization: createDatumDto.tumorsOtherLocalization,
      RBC: createDatumDto.RBC,
      MCV: createDatumDto.MCV,
      RDW: createDatumDto.RDW,
      RDWa: createDatumDto.RDWa,
      HCT: createDatumDto.HCT,
      PLT: createDatumDto.PLT,
      MPV: createDatumDto.MPV,
      PDW: createDatumDto.PDW,
      PCT: createDatumDto.PCT,
      LPCR: createDatumDto.LPCR,
      WBC: createDatumDto.WBC,
      HGB: createDatumDto.HGB,
      MCH: createDatumDto.MCH,
      MCHC: createDatumDto.MCHC,
      LYM: createDatumDto.LYM,
      GRAN: createDatumDto.GRAN,
      MID: createDatumDto.MID,
      LIMProcent: createDatumDto.LIMProcent,
      GRAProcent: createDatumDto.GRAProcent,
      MIDProcent: createDatumDto.MIDProcent,
      NEUT: createDatumDto.NEUT,
      BO: createDatumDto.BO,
      BASO: createDatumDto.BASO,
      MON: createDatumDto.MON,
      Ultrasound: createDatumDto.Ultrasound,
      metastasa: createDatumDto.metastasa,
      answer: createDatumDto.answer,
    };

    return await this.dataRepository.save(newDatum);
  }

  async findAll() {
    return await this.dataRepository.find();
  }

  async findOne(id: number) {
    const data = await this.dataRepository.findOne({
      where: { id },
    });
    if (!data) throw new NotFoundException('Data not found');

    return data;
  }

  async update(id: number, updateDatumDto: UpdateDatumDto) {
    const data = await this.dataRepository.findOne({
      where: { id },
    });

    if (!data) throw new NotFoundException('Data not found');

    return await this.dataRepository.update(id, updateDatumDto);
  }

  async remove(id: number) {
    const isExist = await this.dataRepository.findOne({
      where: { id },
    });
    if (!isExist) throw new NotFoundException('Data not found');
    return await this.dataRepository.delete(id);
  }

  async getColumnNames() {
    const data = this.dataRepository.metadata.propertiesMap;
    let newData = [];
    for (let i in data) {
      newData.push({ id: data[i] });
    }

    return newData;
  }

  async findAllWithPagination(page: number, limit: number) {
    return this.dataRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
