import { BaseExternalEventMessage } from 'src/external-services/base';
import { PustNotificationPayload } from '../dto';
import { IExternalNotificationService } from '../types';
import {
  EXTERNAL_CMD,
  EXTERNAL_SERVICES,
} from 'src/external-services/constants';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export class ExternalNotificationService
  implements IExternalNotificationService
{
  constructor(
    @Inject(EXTERNAL_SERVICES.MAP_SPACE_NOTIFICATION_SERVICES)
    private _externalNotification: ClientProxy,
    private _httpService: HttpService,
  ) {}

  async pushNotification(
    payload: BaseExternalEventMessage<PustNotificationPayload>,
  ): Promise<void> {
    await lastValueFrom(
      this._externalNotification.emit(
        EXTERNAL_CMD.MAP_SPACE_NOTIFICATION_EVENT,
        payload.buildRecord(),
      ),
    );
  }

  async pingNotification() {
    const result = await lastValueFrom(
      this._externalNotification.send('ping-notification', { name: 'kakak' }),
    );
    console.log('result', result);
  }
}
