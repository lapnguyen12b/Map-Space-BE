import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSigninDto {
  @ApiProperty({ default: 'abc@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
