import { forwardRef, Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '@app/auth/auth.module'
import {
  Category,
  CategoryEntity
} from '@app/category/entities/category.entity'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategoryEntity
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ]),
    forwardRef(() => AuthModule)
  ],
  providers: [CategoryResolver, CategoryService]
})
export class CategoryModule {}
