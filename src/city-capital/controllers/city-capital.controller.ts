import { Controller } from '@nestjs/common';
import { CityCapitalService } from '../services';

@Controller('city-capital')
export class CityCapitalController {
  constructor(private readonly cityCapitalService: CityCapitalService) {}
}
