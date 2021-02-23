
import { Table, Column, Model, BeforeCreate, DataType } from 'sequelize-typescript';

@Table({tableName: "users"})
export class User extends Model<User> {
  @Column(DataType.BIGINT)
  phone: number;

  // @BeforeCreate
  // static doStuff(att: any) {
  //   console.log("BEFORE CREATE", att);
  // }
}