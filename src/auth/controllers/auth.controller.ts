import { Body, Controller, Post } from '@nestjs/common';
import { SerializeUserToken } from 'src/user/decorators';
import { UserLoginDto, UserSigninDto, UserSignupDto } from 'src/user/dto';
import { User } from 'src/user/entity';
import { RefreshTokenDto } from '../dto';
import { RefreshToken } from '../interfaces';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: UserSignupDto): Promise<User> {
    return this.authService.signUpUser(dto)
  }
  
  @Post('signin')
  @SerializeUserToken()
  signin(@Body() dto: UserSigninDto): Promise<User> {
    return this.authService.signin(dto)
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshToken> {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('login-test-token')
  login(@Body() loginDto: UserLoginDto): string {
    return this.authService.login(loginDto)
  }
}
function SerializeAdminToken() {
  throw new Error('Function not implemented.');
}

