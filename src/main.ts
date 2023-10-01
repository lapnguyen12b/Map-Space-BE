import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env.config';
import { logger } from './logger/middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //using Global middleware
  app.use(logger);
  const config = new DocumentBuilder()
    .setTitle('Map space Swagger')
    .setDescription('The Map-Space API description')
    .setVersion('1.0')
    .addTag('map-space')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running ...');
    console.log(env.DOMAN_BE);
  });
}
bootstrap();
