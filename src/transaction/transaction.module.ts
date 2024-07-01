import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from '@transaction/transaction.resolver';
import { TransactionRepository } from '@transaction/repository/transaction.repository';
import { Transaction } from '@transaction/entity/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService, TransactionRepository, TransactionResolver],
  exports: [TransactionService],
})
export class TransactionModule {}
