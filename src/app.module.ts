import { CacheModule, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FirebaseStrategy } from '@passport/firebase.strategy'
import { ApolloModule } from '@apollo/apollo.module'
import { UserModule } from '@app/user/user.module'
import { DatabaseModule } from './database/database.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { NotifyModule } from '@app/notify/notify.module'
import { ConfigModule } from '@nestjs/config'
import { PubSubModule } from '@apollo/pubsub.module'
import { UploadModule } from '@app/upload/upload.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from '@app/auth/auth.module'
import { FirebaseModule } from '@app/firebase/firebase.module'
import { CategoryModule } from './app/category/category.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
      exclude: ['/graphql*']
    }),
    CacheModule.register(),
    ApolloModule,
    UserModule,
    DatabaseModule,
    DatabaseModule,
    NotifyModule,
    PubSubModule,
    UploadModule,
    AuthModule,
    FirebaseModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseStrategy]
})
export class AppModule {}
