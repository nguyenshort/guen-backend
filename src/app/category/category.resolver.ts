import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import { UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from '@guards/jwt.guard'
import { InputValidator } from '@shared/validator/input.validator'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async createCategory(
    @Args('input', new InputValidator()) input: CreateCategoryInput
  ) {
    return this.categoryService.create(input)
  }

  @Query(() => [Category], { name: 'category' })
  findAll() {
    return this.categoryService.findAll()
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id)
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput
    )
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id)
  }
}
