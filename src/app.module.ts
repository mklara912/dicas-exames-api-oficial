import { Module } from '@nestjs/common';
import { ExamesModule } from './exames/exames.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [ExamesModule, PropertiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
