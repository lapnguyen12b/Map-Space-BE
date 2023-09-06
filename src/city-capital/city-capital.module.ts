import { Module } from '@nestjs/common';
import { CityCapitalController } from './controllers';
import { CityCapitalService } from './services';

@Module({
  controllers: [CityCapitalController],
  providers: [CityCapitalService],
})
export class CityCapitalModule {}
