import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionResponseDto {
  @Field(() => String)
  date: string;
  @Field(() => Float)
  total_amount: number;
}
