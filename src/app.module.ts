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
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './files';
import { BullModule } from '@nestjs/bull';
import { env } from './config/env.config';
import { ExternalModule } from './external-services';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
    }),
    dataBaseConfig,
    LoggerModule,
    CoreModule,
    AuthModule,
    UserModule,
    RoomModule,
    ImageModule,
    CityCapitalModule,
    FileModule,
    BullModule.forRoot({
      redis: {
        host: env.REDIS.HOST,
        port: env.REDIS.PORT,
        username: env.REDIS.USER,
        password: env.REDIS.PASS,
      },
    }),
    ExternalModule,
    ProfileModule,
    CategoriesModule,
    ReviewsModule,
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
