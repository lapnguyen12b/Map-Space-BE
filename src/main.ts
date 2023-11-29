import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env.config';
import { logger } from './logger/middleware';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Map space API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // const options: SwaggerDocumentOptions =  {
  //   // deepScanRoutes: true,
  //   operationIdFactory: (
  //     controllerKey: string,
  //     methodKey: string
  //   ) => methodKey
  // };
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  // const document = SwaggerModule.createDocument(app, config, options);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, customOptions);

  //using Global middleware
  app.use(logger);
  await app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running ...');
    console.log(env.DOMAN_BE);
  });
}
bootstrap();
