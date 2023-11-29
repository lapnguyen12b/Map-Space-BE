import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  onstructor() {}

  @Get('test/jwt')
  @UseGuards(JwtAuthGuard)
  testJWT(): string {
    return 'test Authorized';
  }
}
