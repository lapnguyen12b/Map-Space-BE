import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env.config';
import { logger } from './logger/middleware';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  // const options: SwaggerDocumentOptions =  {
  //   // deepScanRoutes: true,
  //   operationIdFactory: (
  //     controllerKey: string,
  //     methodKey: string
  //   ) => methodKey
  // };
  // const document = SwaggerModule.createDocument(app, config, options);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //using Global middleware
  app.use(logger);
  await app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running ...');
    console.log(env.DOMAN_BE);
  });
}
bootstrap();
