import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {
  private readonly logger = new Logger(FirebaseGuard.name)

  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = this.getRequest(context)
    // Request bình thường
    if (req) {
      return super.canActivate(context)
    }
    // Subscription user
    const ctx = GqlExecutionContext.create(context).getContext()
    return !!ctx?.user
  }

  getRequest(context: ExecutionContext) {
    /**
     * nếu từ subscription thì ctx sẽ ko có req và có user
     */
    const ctx = GqlExecutionContext.create(context).getContext()
    if (ctx.isSubscription)
      return {
        headers: {
          authorization: ctx._token
        }
      }

    return ctx.req
  }
}
