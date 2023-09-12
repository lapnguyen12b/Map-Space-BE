import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

export class BaseController {
  public responseCustom(
    res: Response,
    data: any,
    option: ResponseOption = {
      total: 0,
      message: '',
      code: '',
      status: HttpStatus.OK,
      extraData: {},
      skip: 0,
      take: 0,
    },
    request?: Request,
  ) {
    const {
      message,
      total,
      code,
      status = HttpStatus.OK,
      extraData,
      skip,
      take,
    } = option;

    res.status(status).send({
      status,
      message: message,
      data: data,
      total,
      code,
      extraData,
      skip,
      take,
    });
  }
}

export type ResponseOption = {
  total?: number;
  message?: string;
  code?: string;
  extraData?: object;
  status?: HttpStatus;
  skip?: number;
  take?: number;
};
