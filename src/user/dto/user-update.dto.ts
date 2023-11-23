import { Optional } from '@nestjs/common';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ROLE, STATUS } from 'src/enums/status.enum';

export class UserUpdateDto {
  @Optional()
  @IsString()
  readonly userName: string;

  @Optional()
  @IsString()
  readonly password: string;

  @Optional()
  readonly isSendEmailWelcome: boolean;

  @Optional()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @Optional()
  @IsString()
  readonly status: STATUS;

  @Optional()
  @IsEnum(ROLE)
  readonly role: ROLE;
}
