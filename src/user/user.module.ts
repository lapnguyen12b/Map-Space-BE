import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './consumers/email.consumer';
import { SEND_EMAIL_QUEUE } from 'src/core/constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SEND_EMAIL_QUEUE,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, EmailConsumer],
  exports: [UserService],
})
export class UserModule {}
