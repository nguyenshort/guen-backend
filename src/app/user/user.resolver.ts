import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User, UserDocument } from './entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@decorators/user.decorator'
import { InputValidator } from '@shared/validator/input.validator'
import { GetUsersFilter } from '@app/user/filters/get-users.filter'
import { FilterQuery } from 'mongoose'
import { JWTAuthGuard } from '@guards/jwt.guard'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { name: 'me' })
  @UseGuards(JWTAuthGuard)
  getUser(@CurrentUser() user) {
    return user
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JWTAuthGuard)
  async getUsers(@Args('filter', new InputValidator()) filter: GetUsersFilter) {
    const _filter: FilterQuery<UserDocument> = {}
    if (filter.name) {
      _filter.name = { $regex: filter.name, $options: 'i' }
    }
    if (filter.email) {
      _filter.email = { $regex: filter.email, $options: 'i' }
    }
    if (filter.exclude.length) {
      _filter._id = { $nin: filter.exclude }
    }
    return this.usersService.find(_filter, filter)
  }
}
