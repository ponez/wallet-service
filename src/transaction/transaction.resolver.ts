import { Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from '@transaction/entity/transaction.entity';
import { TransactionResponseDto } from '@transaction/dto/transaction.response.dto';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [TransactionResponseDto])
  async dailyTotals(): Promise<{ date: string; totalAmount: number }[]> {
    return await this.transactionService.getDailyTotals();
  }
}
