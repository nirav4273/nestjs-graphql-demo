import { HttpException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CustomErrorResponse } from 'src/utils/response';
import { UserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { UserModel } from './models/user.model';
import { UserService } from './users.service';

const pubSub = new PubSub();

@Resolver(of => UserModel)
export class RecipesResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserModel)
  async user(@Args('id') id: number): Promise<UserModel> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(returns => [UserModel])
  users(@Args() usersArgs: UsersArgs): Promise<UserModel[]> {
    return this.userService.findAll(usersArgs);
  }

  @Mutation(returns => UserModel)
  async addUser(
    @Args('newUserData') newUserData: UserInput,
  ): Promise<any> {
    const find = await this.userService.findByPhone(newUserData.phone);
    if(find) {
      throw new CustomErrorResponse({
        msg: "User Already exist",
        code: 404
      });
    } else {      
      const user = await this.userService.create(newUserData);
      pubSub.publish('userAdded', { userAdded: user });
      return user;
    }
  }

  @Query(returns => Boolean)
  async removeUser(@Args('id') id: number) {
    return this.userService.remove(id);
    return
  }

  @Subscription(returns => UserModel)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
