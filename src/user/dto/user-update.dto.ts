import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ROLE, STATUS } from 'src/enums/status.enum';

export class UserUpdateDto {
  @ApiProperty()
  @Optional()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @Optional()
  @IsString()
  readonly password: string;

  @ApiProperty({ default: 'true' })
  @Optional()
  readonly isSendEmailWelcome: boolean;

  @ApiProperty({ default: 'abc@gmail.com' })
  @Optional()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @ApiProperty({
    enum: STATUS,
    default: STATUS.ACTIVE,
    description: 'ACTIVE, INACTIVE',
  })
  @Optional()
  @IsString()
  readonly status: STATUS;

  @ApiProperty({
    enum: ROLE,
    default: ROLE.USER,
    description: 'ADMIN, USER, DOCTOR, MEDICAL',
  })
  @Optional()
  @IsEnum(ROLE)
  readonly role: ROLE;
}
