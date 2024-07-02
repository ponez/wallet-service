import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';

@InputType()
export class UpdateBalanceDto {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  userId: number;

  @Field(() => Float)
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  amount: number;
}
