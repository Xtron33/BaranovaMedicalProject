import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Datum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  hormonalBackground: number;

  @Column({ nullable: true })
  cardivascularSystem: number;

  @Column({ nullable: true })
  genitourinarySystem: number;

  @Column({ nullable: true })
  gastrointestinalTract: number;

  @Column({ nullable: true })
  angiopathy: number;

  @Column({ nullable: true })
  tumorsOtherLocalization: number;

  @Column({ nullable: true })
  RBC: number;

  @Column({ nullable: true })
  MCV: number;

  @Column({ nullable: true })
  RDW: number;

  @Column({ nullable: true })
  RDWa: number;

  @Column({ nullable: true })
  HCT: number;

  @Column({ nullable: true })
  PLT: number;

  @Column({ nullable: true })
  MPV: number;

  @Column({ nullable: true })
  PDW: number;

  @Column({ nullable: true })
  PCT: number;

  @Column({ nullable: true })
  LPCR: number;

  @Column({ nullable: true })
  WBC: number;

  @Column({ nullable: true })
  HGB: number;

  @Column({ nullable: true })
  MCH: number;

  @Column({ nullable: true })
  MCHC: number;

  @Column({ nullable: true })
  LYM: number;

  @Column({ nullable: true })
  GRAN: number;

  @Column({ nullable: true })
  MID: number;

  @Column({ nullable: true })
  LIMProcent: number;

  @Column({ nullable: true })
  GRAProcent: number;

  @Column({ nullable: true })
  MIDProcent: number;

  @Column({ nullable: true })
  NEUT: number;

  @Column({ nullable: true })
  BO: number;

  @Column({ nullable: true })
  BASO: number;

  @Column({ nullable: true })
  MON: number;

  @Column({ nullable: true })
  Ultrasound: number;

  @Column({ nullable: true })
  metastasa: number;

  @Column({ nullable: true })
  answer: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
