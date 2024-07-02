import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';

const gql = '/graphql';

describe('UserResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('user balance', () => {
      it('should return user balance', async () => {
        const userId = 1;

        const GET_BALANCE = `
          query GetBalance($userId: Int!) {
            balance(GetBalanceDto: { userId: $userId }) {
              balance
            }
          }
        `;

        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: GET_BALANCE,
            variables: { userId },
          })
          .expect(200)
          .expect((res) => {
            const { data, errors } = res.body;
            if (errors) {
              console.error(errors);
            }
            expect(data).toBeDefined();
            expect(data.balance).toBeDefined();
            expect(data.balance.balance).toBeDefined();
          });
      });

      it('should update user balance', async () => {
        const UPDATE_BALANCE = `
          mutation UpdateBalance($updateBalanceDto: UpdateBalanceDto!) {
            updateBalance(UpdateBalanceDto: $updateBalanceDto) {
              reference_id
            }
          }
        `;

        const userId = 1;
        const amount = -500;

        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: UPDATE_BALANCE,
            variables: { updateBalanceDto: { userId, amount } },
          })
          .expect(200)
          .expect((res) => {
            const { data, errors } = res.body;
            if (errors) {
              console.error(errors);
            }
            expect(data).toBeDefined();
            expect(data.updateBalance).toBeDefined();
            expect(data.updateBalance.reference_id).toBeDefined();
          });
      });
    });
  });
});
