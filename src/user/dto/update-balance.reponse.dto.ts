import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateBalanceReponseDto {
  @Field(() => Int)
  reference_id: number;
}
