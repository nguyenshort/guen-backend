import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from '@app/user/user.module'
import { JwtStrategy } from '@passport/jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '3d'
        }
      }),
      inject: [ConfigService]
    }),
    forwardRef(() => UserModule),
    ConfigModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
