import { EntityRepository, Like, Repository } from 'typeorm';
import { CityCapital } from '../entity';

@EntityRepository(CityCapital)
export class CityRepository extends Repository<CityCapital> {
  async getOneCity(cityName: string): Promise<CityCapital | undefined> {
    return this.findOne({
      where: {
        cityName: Like(`%${cityName}`),
      },
    });
  }

  async getTopCity(): Promise<CityCapital[]> {
    return this.find({
      take: 10,
    });
  }
}
