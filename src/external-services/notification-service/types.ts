import { BaseExternalEventMessage } from '../base';
import { PustNotificationPayload } from './dto';

export interface IExternalNotificationService {
  pushNotification(
    payload: BaseExternalEventMessage<PustNotificationPayload>,
  ): Promise<void>;

  pingNotification(): Promise<void>;
}
