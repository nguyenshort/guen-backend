import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { FirebaseGuard } from '@guards/firebase.guard'
import { CurrentUser } from '@decorators/user.decorator'
import { User } from '@app/user/entities/user.entity'
import { AuthService } from '@app/auth/auth.service'
import { JWTAuthGuard } from '@guards/jwt.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('auth')
  @UseGuards(FirebaseGuard)
  async auth(@CurrentUser() user: User) {
    const token = await this.authService.JWTGenerator(user)
    return {
      token
    }
  }

  @Get('auth')
  @UseGuards(JWTAuthGuard)
  async me(@CurrentUser() user: User) {
    return user
  }
}
