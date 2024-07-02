import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

const gql = '/graphql';

describe('TransactionResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('transactions', () => {
      it('should return daily totals', async () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
              query {
                dailyTotals {
                  date
                  total_amount
                }
              }
            `,
          })
          .expect(200)
          .expect((res) => {
            const { data, errors } = res.body;

            // Check for errors in response
            if (errors) {
              console.error(errors);
            }

            // Check if data is defined and has dailyTotals array
            expect(data).toBeDefined();
            expect(data.dailyTotals).toBeDefined();
            expect(Array.isArray(data.dailyTotals)).toBe(true);

            // Optionally check structure of dailyTotals objects
            if (data.dailyTotals.length > 0) {
              expect(data.dailyTotals[0]).toHaveProperty('date');
              expect(data.dailyTotals[0]).toHaveProperty('total_amount');
            }
          });
      });
    });
  });
});
