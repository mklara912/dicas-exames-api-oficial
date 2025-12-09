import { Module } from '@nestjs/common';
import { ExamesModule } from './exames/exames.module';

@Module({
  imports: [ExamesModule],
  controllers: [],       // ← mantém vazio se não tiver controller
  providers: [],         // ← mantém vazio se não tiver providers
})
export class AppModule {}
