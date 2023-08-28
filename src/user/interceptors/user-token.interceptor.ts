import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AuthService } from 'src/auth/services'
import { User } from '../entity'

@Injectable()
export class UserTokenInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap(async (user: User) => {
        const { token, refreshToken } = await this.authService.signToken(user)
        user.refreshToken = refreshToken
        return {
          token,
          refreshToken,
          user,
        }
      }),
    )
  }
}
