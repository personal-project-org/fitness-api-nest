import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../src/infrastructure/prisma/prisma.module';
import { PrismaService } from '../../src/infrastructure/prisma/prisma.service';
import {
  AccountCreateRequest,
  AccountRepository,
  AccountUpdateRequestData,
} from '../../src/api/accounts/repository/account.repository';
import { AccountApiModule } from '../../src/api/accounts/account-api.module';
import { CaloricBalanceFactor } from '@prisma/client';
import {
  CaloricBalanceFactorCreateRequest,
  CaloricBalanceFactorRepository,
} from '../../src/api/caloric-balance-factor/repository/factor.repository';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('AccountRepository', () => {
  let app: INestApplication;
  let module: TestingModule;
  let prisma: PrismaService;
  let accountRepository: AccountRepository;
  let caloricBalanceFactorRepository: CaloricBalanceFactorRepository;

  jest.setTimeout(99999);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    module = await module.init();

    app = module.createNestApplication();
    app = await app.init();

    accountRepository = module.get<AccountRepository>(AccountRepository);
    expect(accountRepository).toBeDefined();

    caloricBalanceFactorRepository = module.get<CaloricBalanceFactorRepository>(
      CaloricBalanceFactorRepository,
    );
    expect(caloricBalanceFactorRepository).toBeDefined();

    prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeDefined();
  });

  afterEach(async () => {
    await prisma.caloricBalanceFactor.deleteMany({});
    await prisma.account.deleteMany({});
  });
  afterAll(async () => {
    await app.close();
  });

  describe('/graphql (POST)', () => {
    describe('getDailyReport', () => {
      it('Should return an accurate summary of calories/macros given a specific day', async () => {
        //Create Account
        const accountCreateRequest: AccountCreateRequest = {
          username: 'the-test-user',
          password: 'the-password',
          calorie_goal: 3000,
          protein_goal: 200,
          carb_goal: 100,
          fat_goal: 90,
        };

        const accountCreateResult = (
          await accountRepository.create(accountCreateRequest)
        ).unwrap();

        expect(accountCreateResult).toBeTruthy();

        const accountId = accountCreateResult.id;
        const date = new Date('2019-01-16T00:00:00.000');

        const caloricBalanceFactorRequests: CaloricBalanceFactorCreateRequest[] =
          [
            {
              accountId: accountId,
              date: date,
              balanceFactorType: 'Food',
              caloriesConsumed: 300,
              protein: 20,
              carbs: 30,
              fat: 5,
            },
            {
              accountId: accountId,
              date: date,
              balanceFactorType: 'Food',
              caloriesConsumed: 300,
              protein: 80,
              carbs: 60,
              fat: 10,
            },
            {
              accountId: accountId,
              date: date,
              balanceFactorType: 'Food',
              caloriesConsumed: 300,
              protein: 160,
              carbs: 120,
              fat: 20,
            },
            {
              accountId: accountId,
              date: date,
              balanceFactorType: 'Exercise',
              caloriesBurned: 200,
            },
          ];

        await caloricBalanceFactorRepository.create(
          caloricBalanceFactorRequests[0],
        );
        await caloricBalanceFactorRepository.create(
          caloricBalanceFactorRequests[1],
        );
        await caloricBalanceFactorRepository.create(
          caloricBalanceFactorRequests[2],
        );
        await caloricBalanceFactorRepository.create(
          caloricBalanceFactorRequests[3],
        );

        const balanceFactorArray = (
          await caloricBalanceFactorRepository.getAllCaloricBalanceFactors()
        ).unwrap();

        expect(balanceFactorArray).toHaveLength(4);

        const queryString = `query {
                  getDailyReport(input:{
                      accountId: "${accountId}",
                      date: "2019-01-16T00:00:00.000"
                  }){
                      username,
                      accountId,
                      date,
                      caloriesBurned,
                      caloriesConsumed,
                      calorieTotal,
                      totalProtein,
                      totalCarbs,
                      totalFat }
                }`;

        let expectedTotals = {
          calories: 700,
          protein: 260,
          carbs: 210,
          fat: 35,
        };

        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: queryString,
          })
          .expect(200)
          .then((res) => {
            let parsedReturn = JSON.parse(res.text);
            let report = parsedReturn.data.getDailyReport;

            expect(report.calorieTotal).toEqual(expectedTotals.calories);
            expect(report.totalProtein).toEqual(expectedTotals.protein);
            expect(report.totalCarbs).toEqual(expectedTotals.carbs);
            expect(report.totalFat).toEqual(expectedTotals.fat);
          });
      });
    });
  });
});
