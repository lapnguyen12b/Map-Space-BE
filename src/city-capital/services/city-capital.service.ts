import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CityCapital } from '../entity';
import { CityRepository } from '../repository';
import { CityDto } from '../dto';

@Injectable()
export class CityCapitalService {
  constructor(private connection: Connection) {}

  async addNewCity(cityDto: CityDto): Promise<CityCapital> {
    const { cityName, lat, lng } = cityDto;
    const cityRepository = this.connection.getCustomRepository(CityRepository);
    const existCity = await cityRepository.getOneCity(cityName);
    if (existCity) {
      throw new BadRequestException('City already exists!');
    }
    const url = cityName.toLowerCase().replace(' ', '-');
    //handle image url CDN
    //
    return cityRepository.save({
      cityName,
      lat,
      lng,
      url,
      imageUrl:
        'https://bizweb.dktcdn.net/100/411/769/files/side-sliding-garage-doors.jpg?v=1610596845234',
    });
  }

  async getTopCity(): Promise<CityCapital[]> {
    const cityRepository = this.connection.getCustomRepository(CityRepository);
    const topCity = await cityRepository.getTopCity();
    if (!topCity) {
      throw new BadRequestException('Top City not found!');
    }
    return topCity;
  }
}
