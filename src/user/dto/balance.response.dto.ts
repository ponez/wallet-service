import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BalanceResponseDto {
  @Field(() => Int)
  balance: number;
}
