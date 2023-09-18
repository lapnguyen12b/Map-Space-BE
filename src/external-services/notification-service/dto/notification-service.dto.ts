import { BaseExternalFilter } from 'src/external-services/base';
import { NotificationTypeKey } from 'src/external-services/constants';
import { User } from 'src/user/entity';

export type PustNotificationPayload = {
  user: User;
  data: object;
  notificationTypeKey: NotificationTypeKey;
};

export class UpdateNotificationDto {
  read: boolean;
  updatedBy: string;
}

export class ListNotificationsDto extends BaseExternalFilter {}
