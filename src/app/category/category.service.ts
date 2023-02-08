import { Injectable } from '@nestjs/common'
import { UpdateCategoryInput } from './dto/update-category.input'
import { InjectModel } from '@nestjs/mongoose'
import { AnyKeys, Model } from 'mongoose'
import {
  Category,
  CategoryDocument
} from '@app/category/entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}
  async create(input: AnyKeys<Category>) {
    return this.categoryModel.create({
      ...input,
      createdAt: Date.now()
    })
  }

  findAll() {
    return `This action returns all category`
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`
  }

  remove(id: number) {
    return `This action removes a #${id} category`
  }
}
