import { Controller, Get } from '@nestjs/common';
import { ExamesService } from './exames.service';

@Controller('/exames')
export class ExamesController {
  constructor(private readonly examesService: ExamesService) {}

  @Get('/')
  findAll() {
    return this.examesService.findAll();
  }
}
