import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface GeoapifyHospitalProperties {
  name?: string;
  city?: string;
  municipality?: string;
  county?: string;
  formatted?: string;
  lat?: number;
  lon?: number;
}

interface GeoapifyFeature {
  properties: GeoapifyHospitalProperties;
}

@Injectable()
export class PropertiesService {
  private readonly apiKey = '07f243df0f3446c49091adafd23d04e0';

  private readonly latitude = -9.754;
  private readonly longitude = -36.661;

  async findHospitalsByCity(
    city: string,
  ): Promise<GeoapifyHospitalProperties[]> {
    try {
      const url =
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${this.longitude},${this.latitude},10000&bias=proximity:${this.longitude},${this.latitude}&limit=20&apiKey=${this.apiKey}`.replace(
          /\s/g,
          '',
        );

      console.log('Buscando hospitais...');
      console.log('URL:', url);

      const response = await axios.get(url);

      if (response.status === 200 && response.data?.features) {
        const features = response.data.features as GeoapifyFeature[];

        if (Array.isArray(features)) {
          const hospitals: GeoapifyHospitalProperties[] = [];

          const search = String(city ?? '')
            .toLowerCase()
            .trim();

          console.log(`Total de features encontradas: ${features.length}`);

          for (const feature of features) {
            try {
              const props: GeoapifyHospitalProperties = feature.properties;

              if (!props) continue;

              const cidade = String(props.city ?? '')
                .toLowerCase()
                .trim();
              const municipio = String(props.municipality ?? '')
                .toLowerCase()
                .trim();
              const county = String(props.county ?? '')
                .toLowerCase()
                .trim();
              const formatted = String(props.formatted ?? '').toLowerCase();

              const isCity =
                cidade.includes(search) ||
                municipio.includes(search) ||
                county.includes(search) ||
                formatted.includes(search);

              if (isCity) {
                hospitals.push(props);
                console.log(`${props.name ?? 'Sem nome'} — ACEITO`);
              } else {
                console.log(`${props.name ?? 'Sem nome'} — REJEITADO`);
              }
            } catch (err) {
              console.error('Erro ao processar feature:', err);
            }
          }

          console.log(`Total final de hospitais: ${hospitals.length}`);
          return hospitals;
        }
      }

      return [];
    } catch (error) {
      const err = error as Error;
      console.error('Erro ao buscar hospitais:', err.message);
      return [];
    }
  }
}
