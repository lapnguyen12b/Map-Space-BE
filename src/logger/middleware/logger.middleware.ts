import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const domain = process.env.DOMAN_BE
    console.log(`Request ... ${req.method} - ${domain}${req.url}`)
    console.log(`-----------------`)
    next()
  }
}