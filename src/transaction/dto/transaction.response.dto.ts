import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionResponseDto {
  @Field(() => String)
  date: string;
  @Field(() => Int)
  total_amount: number;
}
