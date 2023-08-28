import { applyDecorators, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { UserTokenInterceptor } from '../interceptors'

export function SerializeUserToken(): any {
  return applyDecorators(UseInterceptors(UserTokenInterceptor, ClassSerializerInterceptor))
}
