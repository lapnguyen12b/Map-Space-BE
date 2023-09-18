import { Global, Module } from '@nestjs/common';
import { NotificationModule } from './notification-service';

@Global()
@Module({
  imports: [NotificationModule],
  exports: [NotificationModule],
})
export class ExternalModule {}
