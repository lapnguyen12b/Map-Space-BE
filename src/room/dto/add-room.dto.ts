import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Role, SERVICE_TYPE } from 'src/enums/status.enum';

export class AddRoomDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly pricePerMonth: number;

  @IsNotEmpty()
  @IsNumber()
  readonly pricePerYear: number;

  @IsNotEmpty()
  @IsString()
  readonly size: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly lat: string;

  @IsNotEmpty()
  @IsString()
  readonly lng: string;

  @IsNotEmpty()
  @IsEnum(SERVICE_TYPE)
  readonly service: SERVICE_TYPE;

  @IsNotEmpty()
  @IsNumber()
  readonly numberOfProple: number;
}
