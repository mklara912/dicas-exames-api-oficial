import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes globais para validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Remove campos não declarados no DTO
      forbidNonWhitelisted: true,  // Bloqueia requisições com campos extras
      transform: true,             // Converte tipos automaticamente
    }),
  );

  // Liberar CORS
  app.enableCors({
    origin: '*',  // pode ajustar depois
  });

  // Porta da API
  await app.listen(3000);
  console.log('🚀 Servidor rodando em http://localhost:3000');
}

bootstrap();
