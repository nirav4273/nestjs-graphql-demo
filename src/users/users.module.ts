import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.enitity';
// import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  providers: [RecipesResolver, UserService],
})
export class RecipesModule {}
