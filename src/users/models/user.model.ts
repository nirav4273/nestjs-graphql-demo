import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DataType } from 'sequelize';

@ObjectType()
export class UserModel {
  @Field()
  id?: number;

  @Field()
  phone: number
  
  @Field()
  createdAt?: Date
  
  @Field()
  updatedAt?: Date
  
  
}
