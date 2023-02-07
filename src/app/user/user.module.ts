import { forwardRef, Global, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserEntity } from '@app/user/entities/user.entity'
import { UserController } from '@app/user/user.controller'
import { AuthModule } from '@app/auth/auth.module'

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserEntity
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ]),
    forwardRef(() => AuthModule)
  ],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
