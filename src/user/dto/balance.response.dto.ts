import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BalanceResponseDto {
  @Field(() => Float)
  balance: number;
}
