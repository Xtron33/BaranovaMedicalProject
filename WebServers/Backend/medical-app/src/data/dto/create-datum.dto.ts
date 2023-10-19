import { IsOptional } from 'class-validator';

export class CreateDatumDto {
  @IsOptional()
  gender: number;
  @IsOptional()
  hormonalBackground: number;
  @IsOptional()
  cardivascularSystem: number;
  @IsOptional()
  genitourinarySystem: number;
  @IsOptional()
  gastrointestinalTract: number;
  @IsOptional()
  angiopathy: number;
  @IsOptional()
  tumorsOtherLocalization: number;
  @IsOptional()
  RBC: number;
  @IsOptional()
  MCV: number;
  @IsOptional()
  RDW: number;
  @IsOptional()
  RDWa: number;
  @IsOptional()
  HCT: number;
  @IsOptional()
  PLT: number;
  @IsOptional()
  MPV: number;
  @IsOptional()
  PDW: number;
  @IsOptional()
  PCT: number;
  @IsOptional()
  LPCR: number;
  @IsOptional()
  WBC: number;
  @IsOptional()
  HGB: number;
  @IsOptional()
  MCH: number;
  @IsOptional()
  MCHC: number;
  @IsOptional()
  LYM: number;
  @IsOptional()
  GRAN: number;
  @IsOptional()
  MID: number;
  @IsOptional()
  LIMProcent: number;
  @IsOptional()
  GRAProcent: number;
  @IsOptional()
  MIDProcent: number;
  @IsOptional()
  NEUT: number;
  @IsOptional()
  BO: number;
  @IsOptional()
  BASO: number;
  @IsOptional()
  MON: number;
  @IsOptional()
  Ultrasound: number;
  @IsOptional()
  metastasa: number;
  @IsOptional()
  answer: number;
}
