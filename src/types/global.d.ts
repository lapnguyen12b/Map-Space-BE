export {};

declare global {
  namespace BaseResponse {
    export type List<T> = {
      total: number;
      items: T[];
    };
  }

  declare interface Class {
    new (...arg): InstanceType;
  }

  export type OrderConditionSQL = 'ASC' | 'DESC';

  export type PromiseCallbackFunctionArgs = (...args: any[]) => Promise<void>;

  type RequiredFields<T, RequiredKeys extends keyof T> = {
    [K in RequiredKeys]-?: T[K];
  } & {
    [K in Exclude<keyof T, RequiredKeys>]?: T[K];
  };
}
