import { IsEmail, IsNotEmpty, IsString } from 'class-validator'


export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

}
