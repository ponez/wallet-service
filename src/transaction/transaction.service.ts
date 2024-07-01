import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '@transaction/repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async createTransaction(userId: number, amount: number): Promise<number> {
    const transaction = await this.transactionRepository.createTransaction(
      userId,
      amount,
    );
    return transaction.id;
  }

  async getDailyTotals(): Promise<{ date: string; totalAmount: number }[]> {
    return await this.transactionRepository.getDailyTotals();
  }
}
