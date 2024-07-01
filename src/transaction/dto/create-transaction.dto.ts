import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CreateTransactionDto {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  userId: number;

  @Field(() => Int)
  @IsInt()
  amount: number; // can be negative for deductions
}
