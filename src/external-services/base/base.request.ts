import { RmqRecord, RmqRecordOptions } from '@nestjs/microservices';
import { BaseFilter } from 'src/shared';

export class BaseExternalFilter extends BaseFilter {
  user: number;
  userType: number;
  constructor(data?: Partial<BaseExternalFilter>) {
    super(data);
    Object.assign(this, data);
  }
}

export class BaseExternalEventMessage<TData> {
  data: TData;
  options?: RmqRecordOptions;
  constructor(payload: TData, options?: RmqRecordOptions) {
    this.data = payload;
    this.options = options;
  }
  public buildRecord() {
    return new RmqRecord<TData>(this.data, this.options);
  }
}
