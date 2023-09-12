import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CityCapitalService } from '../services';
import { CityCapital } from '../entity';
import { CityDto } from '../dto';
import { JwtAuthGuard } from 'src/core/guards';

@Controller('city-capital')
export class CityCapitalController {
  constructor(private readonly cityCapitalService: CityCapitalService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async addNewCity(@Body() cityDto: CityDto): Promise<CityCapital> {
    return this.cityCapitalService.addNewCity(cityDto);
  }

  @Get('top')
  // @UseGuards(JwtAuthGuard)
  async getTopCity(): Promise<CityCapital[]> {
    return this.cityCapitalService.getTopCity();
  }
}
