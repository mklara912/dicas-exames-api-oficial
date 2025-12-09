import { IsString } from 'class-validator';

export class CreateExameDto {
  @IsString()
  nome: string;

  @IsString()
  frequencia: string;

  @IsString()
  descricao: string;
}
