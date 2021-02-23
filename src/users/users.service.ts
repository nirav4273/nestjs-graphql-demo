import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { UserModel } from './models/user.model';
import { User } from "./entity/user.enitity";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: any) {
    try {
      const create = await this.userModel.create(data);
      return create;
    } catch (e) {
      throw new HttpException(e, 404);
    }
  }

  async findByPhone(phone: number): Promise<UserModel> {
    // return null;
    return this.userModel.findOne({
        where: {
          phone
        }
    });
  }

  async findOneById(id: number): Promise<UserModel> {
    return this.userModel.findOne({
      where: {
        id
      }
    })
  }

  async findAll(usersArgs: UsersArgs): Promise<UserModel[]> {
    // return []
    return this.userModel.findAll();
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.userModel.destroy({
        where: {
          id
        }
      });;
      return true;
    } catch (e) {
      return false
    }
  }
}
