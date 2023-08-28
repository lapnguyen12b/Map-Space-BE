import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Role } from 'src/enums/status.enum'


export class UserSignupDto {
  @IsNotEmpty()
  @IsString()
  readonly userName: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string

  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role
}
