import { Module } from '@nestjs/common';
import { EXTERNAL_SERVICES, ExternalServices } from '../constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ExternalNotificationService } from './services';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: EXTERNAL_SERVICES.MAP_SPACE_NOTIFICATION_SERVICES,
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL!],
            queue: process.env.RABBITMQ_NOTIFICATION_QUEUE!,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    HttpModule,
  ],
  providers: [
    {
      useClass: ExternalNotificationService,
      provide: ExternalServices.NotificationService,
    },
  ],
  exports: [ExternalServices.NotificationService],
})
export class NotificationModule {}
