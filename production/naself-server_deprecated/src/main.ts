import { NestFactory } from '@nestjs/core';
import helmet from '@fastify/helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Response } from 'express';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  // Logs
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('NASelf - API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // Security
  app.use((_req, res: Response, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });
  app.register(helmet);

  // Start
  await app.listen(process.env.API_PORT, '0.0.0.0');
}

bootstrap();
