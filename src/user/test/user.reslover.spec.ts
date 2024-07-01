import { UserService } from '@user/user.service';
import { UserResolver } from '@user/user.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            getBalance: jest.fn(),
          },
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should return user balance', async () => {
    const userId = 1;
    const expectedBalance = 1000;
    jest
      .spyOn(userService, 'getBalance')
      .mockResolvedValue({ balance: expectedBalance });

    const result = await userResolver.balance({ userId });
    expect(result).toEqual({ balance: expectedBalance });
  });
});
