import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards';

@Controller('user')
export class UserController {
  onstructor() {}


  @Get('test/jwt')
  @UseGuards(JwtAuthGuard)
  testJWT(): string {
    return 'test Authorized'
  }
}
