import { Injectable } from '@nestjs/common';
import { CreateExameDto } from './dto/create-exames.dto';
import { UpdateExameDto } from './dto/update-exames.dto';
import { defaultExames } from './defaut/exames';
import { Exame } from './entidade/exames.interface';

@Injectable()
export class ExamesService {
  private exames: Exame[] = [...defaultExames];

  findAll(): Exame[] {
    return this.exames;
  }

  findOne(index: number): Exame | undefined {
    return this.exames[index];
  }

  create(data: CreateExameDto): Exame {
    const novo: Exame = {
      ...data,
    };

    this.exames.push(novo);
    return novo;
  }

  update(index: number, data: UpdateExameDto): Exame | null {
    const exame = this.findOne(index);
    if (!exame) return null;

    Object.assign(exame, data);
    return exame;
  }

  remove(index: number) {
    this.exames.splice(index, 1);
    return { removed: true };
  }
}
