import { Exame } from '../entidade/exames.interface';

export const defaultExames: Exame[] = [
  {
    nome: "Hemograma",
    frequencia: "Anual",
    descricao: "Analisa células sanguíneas."
  },
   {
    nome: "Cardiograma",
    frequencia: "Anual",
    descricao: "Analisa o coração."
  },

   {
    nome: "Glicemia em Jejum",
    frequencia: "1 vez por ano (ou a cada 6 meses se houver risco de diabetes)",
    descricao: "Mede o nível de glicose no sangue. Serve para detectar pré-diabetes e diabetes"
  },

  {
    nome: "Creatinina + Taxa de Filtração Glomerular",
    frequencia: "1 vez por ano",
    descricao: "Avalia o funcionamento dos rins"
  },
];
