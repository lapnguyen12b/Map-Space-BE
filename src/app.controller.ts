import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ExternalServices } from './external-services/constants';
import { IExternalNotificationService } from './external-services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) // @Inject(ExternalServices.NotificationService)
  // private _externalNotificationService: IExternalNotificationService,
  {}

  @Get()
  getHello() {
    // return this._externalNotificationService.pingNotification();
    return this.appService.getHello();
  }
}
