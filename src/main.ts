import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { env } from './config/env.config';
import { logger } from './logger/middleware';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // //using Global middleware
  // app.use(logger);
  // await app.listen(process.env.PORT || 3001, () => {
  //   console.log('Server is running ...');
  //   console.log(env.DOMAN_BE);
  // });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false
      },
    },
  });
}
bootstrap();
