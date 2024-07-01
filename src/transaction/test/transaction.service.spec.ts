import { TransactionService } from '@transaction/transaction.service';
import { TransactionRepository } from '@transaction/repository/transaction.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            createTransaction: jest.fn(),
            getDailyTotals: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get<TransactionRepository>(
      TransactionRepository,
    );
  });

  it('should create a new transaction', async () => {
    const userId = 1;
    const amount = 500;
    const mockTransaction = { id: 1, userId, amount, createdAt: new Date() };
    jest
      .spyOn(transactionRepository, 'createTransaction')
      .mockResolvedValue(mockTransaction);

    const transactionId = await transactionService.createTransaction(
      userId,
      amount,
    );
    expect(transactionId).toEqual(mockTransaction.id);
    expect(transactionRepository.createTransaction).toHaveBeenCalledWith(
      userId,
      amount,
    );
  });

  it('should retrieve daily totals', async () => {
    const mockDailyTotals = [
      { date: '2024-07-02', totalAmount: 1000 },
      { date: '2024-07-01', totalAmount: 1500 },
    ];
    jest
      .spyOn(transactionRepository, 'getDailyTotals')
      .mockResolvedValue(mockDailyTotals);

    const dailyTotals = await transactionService.getDailyTotals();

    expect(dailyTotals).toEqual(mockDailyTotals);
    expect(transactionRepository.getDailyTotals).toHaveBeenCalled();
  });
});
