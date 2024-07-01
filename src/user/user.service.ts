import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@user/repository/user.repository';
import { TransactionService } from '@transaction/transaction.service';
import { UpdateBalanceReponseDto } from '@user/dto/update-balance.reponse.dto';
import { BalanceResponseDto } from '@user/dto/balance.response.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly transactionService: TransactionService,
  ) {}

  async getBalance(userId: number): Promise<BalanceResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('user-not-found');
    return { balance: user.balance };
  }

  async updateBalance(
    userId: number,
    amount: number,
  ): Promise<UpdateBalanceReponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) await this.userRepository.addNewUser(amount);

    await this.userRepository.increaseBalance(userId, amount);
    const transactionId = await this.transactionService.createTransaction(
      userId,
      amount,
    );
    return { reference_id: transactionId };
  }
}
