import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalyzDto } from './create-analyz.dto';

export class UpdateAnalyzDto extends PartialType(CreateAnalyzDto) {}
