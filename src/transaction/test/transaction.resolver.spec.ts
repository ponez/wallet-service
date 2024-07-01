import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '@transaction/transaction.service';
import { TransactionResolver } from '@transaction/transaction.resolver';

describe('TransactionResolver', () => {
  let resolver: TransactionResolver;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionResolver,
        {
          provide: TransactionService,
          useValue: {
            getDailyTotals: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TransactionResolver>(TransactionResolver);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should return daily totals', async () => {
    const mockDailyTotals = [
      { date: '2024-07-02', totalAmount: 1000 },
      { date: '2024-07-01', totalAmount: 1500 },
    ];
    jest
      .spyOn(transactionService, 'getDailyTotals')
      .mockResolvedValue(mockDailyTotals);

    const result = await resolver.dailyTotals();
    expect(result).toEqual(mockDailyTotals);
    expect(transactionService.getDailyTotals).toHaveBeenCalled();
  });
});
