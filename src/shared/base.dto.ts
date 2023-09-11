import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class RegistrationDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fullName: string;
}

export class BaseFilter {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skip: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  take: number;
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      return false;
    }
  })
  @IsObject({
    message: 'Invalid filter',
  })
  @IsOptional()
  filter: Record<string, any> = {};
  constructor(data?: Partial<BaseFilter>) {
    if (data) {
      const { skip = 0, take = 10, ...filter } = data;
      this.skip = skip;
      this.take = take;
      this.filter = filter;
    }
  }
}
