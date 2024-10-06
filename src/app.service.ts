import { Injectable } from '@nestjs/common';
import { env } from './config/env.config';

@Injectable()
export class AppService {
  constructor() {}
  async getHello() {
    console.log(env.ROOT_PATH);
    //D:\nestjs\dist
    // TODO
    return 'Hello World! 123';
  }
}
