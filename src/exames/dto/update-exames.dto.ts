import { PartialType } from '@nestjs/mapped-types';
import { CreateExameDto } from './create-exames.dto';

export class UpdateExameDto extends PartialType(CreateExameDto) {}
