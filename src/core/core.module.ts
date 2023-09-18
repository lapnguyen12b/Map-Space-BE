import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { AwsModule } from './aws';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: env.ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: '1d',
          algorithm: 'HS512',
        },
      }),
    }),
    AwsModule,
  ],
  exports: [AwsModule],
})
export class CoreModule {}
