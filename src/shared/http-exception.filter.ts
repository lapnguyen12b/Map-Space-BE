import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  static throwErrorMessage(
    exception: ResponseException,
    statusCode = HttpStatus.BAD_REQUEST,
  ) {
    exception['code'] = exception?.code || 'some_thing_went_wrong';
    exception['code'] = exception?.message || 'Some thing went wrong!';
    throw new HttpException(exception, statusCode);
  }

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { code, message, module, data }: ResponseException =
      exception.getResponse() as ResponseException;

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: code || 'unknown',
      message,
      module,
      data,
    });
  }
}

export type ResponseException = {
  status?: HttpStatus;
  error?: string;
  code?: string;
  url?: string;
  message?: string;
  module?: string;
  data?: object;
};
