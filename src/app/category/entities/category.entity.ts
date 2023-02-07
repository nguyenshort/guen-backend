import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Field, Float, ID, ObjectType } from '@nestjs/graphql'

export type CategoryDocument = Category & Document

@Schema({
  toJSON: {
    virtuals: true,
    getters: true
  },
  toObject: {
    virtuals: true,
    getters: true
  }
})
@ObjectType()
export class Category {
  @Field(() => ID)
  id: string

  @Prop({ required: true, index: true })
  @Field(() => String)
  name: string

  @Prop({ type: String })
  @Field(() => String)
  description: string

  @Prop({ slug: 'name', unique: true, index: true })
  @Field(() => String)
  slug: string

  @Prop({ required: true, type: Number, index: true })
  @Field(() => Float)
  createdAt: number
}

export const CategoryEntity = SchemaFactory.createForClass(Category)
