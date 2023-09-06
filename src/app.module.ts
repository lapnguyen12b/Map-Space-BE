import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/middleware';
import { dataBaseConfig } from './config/database.config';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { ImageModule } from './image/image.module';
import { CityCapitalModule } from './city-capital/city-capital.module';

@Module({
  imports: [
    dataBaseConfig,
    LoggerModule,
    CoreModule,
    AuthModule,
    UserModule,
    RoomModule,
    ImageModule,
    CityCapitalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
