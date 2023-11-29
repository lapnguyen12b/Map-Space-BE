import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE } from 'src/enums/status.enum';

export class UserSignupDto {
  @ApiProperty({ default: 'NamNV' })
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ default: 'abc@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @ApiProperty({
    enum: ROLE,
    default: ROLE.USER,
    description: 'ADMIN, USER, DOCTOR, MEDICAL',
  })
  @IsNotEmpty()
  @IsEnum(ROLE)
  readonly role: ROLE;
}
