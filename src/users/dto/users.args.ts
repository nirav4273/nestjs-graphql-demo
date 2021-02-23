import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UsersArgs {
    @Field({ nullable: true })
    id?: Number
}
