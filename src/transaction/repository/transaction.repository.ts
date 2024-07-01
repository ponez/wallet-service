import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '@transaction/entity/transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async createTransaction(
    userId: number,
    amount: number,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      userId,
      amount,
    });
    return this.transactionRepository.save(transaction);
  }

  async getDailyTotals(): Promise<{ date: string; totalAmount: number }[]> {
    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('DATE_TRUNC(\'day\', "createdAt") as date')
      .addSelect('SUM(amount) as "total_amount"')
      .groupBy('date')
      .orderBy('date', 'DESC')
      .getRawMany();
  }
}
