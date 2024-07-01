// user.service.spec.ts

import { UserService } from '@user/user.service';
import { UserRepository } from '@user/repository/user.repository';
import { TransactionService } from '@transaction/transaction.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceResponseDto } from '@user/dto/balance.response.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateBalanceReponseDto } from '@user/dto/update-balance.reponse.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        TransactionService,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            increaseBalance: jest.fn(),
            addNewUser: jest.fn(),
          },
        },
        {
          provide: TransactionService,
          useValue: {
            createTransaction: jest.fn().mockResolvedValue(123),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should return user balance', async () => {
    const userId = 1;
    const expectedBalance = 1000;
    jest
      .spyOn(userRepository, 'findById')
      .mockResolvedValue({ id: userId, balance: expectedBalance });

    const balanceDto: BalanceResponseDto = await userService.getBalance(userId);
    expect(balanceDto.balance).toEqual(expectedBalance);
  });

  it('should throw NotFoundException for non-existing user', async () => {
    const userId = 999;
    jest.spyOn(userRepository, 'findById').mockResolvedValue(undefined);

    await expect(userService.getBalance(userId)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should update user balance and return transaction reference ID', async () => {
    const userId = 1;
    const amount = 500;
    const mockUser = { id: userId, balance: 1000 };
    jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);

    const result: UpdateBalanceReponseDto = await userService.updateBalance(
      userId,
      amount,
    );
    expect(result.reference_id).toEqual(123);
    expect(userRepository.increaseBalance).toHaveBeenCalledWith(userId, amount);
    expect(transactionService.createTransaction).toHaveBeenCalledWith(
      userId,
      amount,
    );
  });

  it('should create new user and update balance for non-existing user', async () => {
    const userId = 999;
    const amount = 500;
    jest.spyOn(userRepository, 'findById').mockResolvedValue(undefined);

    const result: UpdateBalanceReponseDto = await userService.updateBalance(
      userId,
      amount,
    );
    expect(result.reference_id).toEqual(123);
    expect(userRepository.addNewUser).toHaveBeenCalledWith(amount);
    expect(transactionService.createTransaction).toHaveBeenCalledWith(
      userId,
      amount,
    );
  });
});
