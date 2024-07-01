import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdateBalanceDto {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  userId: number;

  @Field(() => Int)
  @IsInt()
  amount: number;
}
