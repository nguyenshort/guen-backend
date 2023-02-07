import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '@app/user/entities/user.entity'

@ObjectType()
export class Notify {
  @Field(() => User, { description: 'Thành viên hiện tại' })
  user: User

  @Field(() => String, { description: 'Nội dung tin nhắn' })
  msg: string

  @Field(() => Boolean, {
    description: 'Thông báo lỗi hay không',
    defaultValue: false
  })
  error: boolean
}
