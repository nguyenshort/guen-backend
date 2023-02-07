import { forwardRef, Module } from '@nestjs/common'
import { FirebaseService } from './firebase.service'
import { FirebaseResolver } from './firebase.resolver'
import { UserModule } from '@app/user/user.module'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [FirebaseResolver, FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}
