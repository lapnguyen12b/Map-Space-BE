import { IsNotEmpty, IsString } from 'class-validator';

export class CityDto {
  @IsNotEmpty()
  @IsString()
  readonly cityName: string;

  @IsNotEmpty()
  @IsString()
  readonly lat: string;

  @IsNotEmpty()
  @IsString()
  readonly lng: string;
}
