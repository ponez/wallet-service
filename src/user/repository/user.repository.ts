import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@user/entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async increaseBalance(userId: number, amount: number): Promise<void> {
    await this.userRepository.increment({ id: userId }, 'balance', amount);
  }

  async addNewUser(amount: number) {
    const user = this.userRepository.create({
      balance: amount,
    });
    return this.userRepository.save(user);
  }
}
