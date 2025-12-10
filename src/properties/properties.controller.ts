import { Controller, Get, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get('hospitals')
  async getHospitals(@Query('city') city: string) {
    if (!city) {
      return {
        error: 'Parâmetro "city" é obrigatório',
      };
    }

    return this.propertiesService.findHospitalsByCity(city);
  }
}
