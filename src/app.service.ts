import { Injectable } from '@nestjs/common'
import { env } from './config/env.config'

@Injectable()
export class AppService {
  getHello(): string {
    console.log(env.ROOT_PATH)
    //D:\nestjs\dist
    return 'Hello World! 123'
  }
}
