import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  onstructor() {}

  @Get('test/jwt')
  @UseGuards(JwtAuthGuard)
  testJWT(): string {
    return 'test Authorized';
  }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }
}
