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

describe('AccountRepository', () => {
  let app: INestApplication;
  let module: TestingModule;
  let prisma: PrismaService;
  let accountRepository: AccountRepository;
  let caloricBalanceFactorRepository: CaloricBalanceFactorRepository;

  jest.setTimeout(99999);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule, AccountApiModule],
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

        const accountId = accountCreateResult.id;

        expect(accountCreateResult).toBeTruthy();

        const caloricBalanceFactorRequests: CaloricBalanceFactorCreateRequest[] =
          [
            {
              accountId: accountId,
              date: new Date('2019-01-16'),
              balanceFactorType: 'Food',
              caloriesConsumed: 300,
              protein: 20,
              carbs: 30,
              fat: 5,
            },
            {
              accountId: accountId,
              date: new Date('2019-01-16'),
              balanceFactorType: 'Food',
              caloriesConsumed: 300,
              protein: 80,
              carbs: 60,
              fat: 10,
            },
            {
              accountId: accountId,
              date: new Date('2019-01-16'),
              balanceFactorType: 'Food',
              caloriesConsumed: 300,
              protein: 160,
              carbs: 120,
              fat: 20,
            },
            {
              accountId: accountId,
              date: new Date('2019-01-16'),
              balanceFactorType: 'Exercise',
              caloriesBurned: 200,
              protein: 160,
              carbs: 120,
              fat: 20,
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

        const confirmArr = (
          await caloricBalanceFactorRepository.getAllCaloricBalanceFactors()
        ).unwrap();

        expect(confirmArr).toHaveLength(4);

        //Create 4 Balance Factors, 1 Exercise Type Associated with the account
        //Get Daily report associated with previously specified date and account

        // const accountUpdateRequest: AccountUpdateRequestData = {
        //   id: accountCreateResult.unwrap().id,
        //   name: 'Bulgarian Split Squat',
        //   type: 'Strength',
        //   body_part: 'Quads',
        // };

        // await accountRepository.update(accountUpdateRequest);

        // const postUpdateAccount = await prisma.account.findUnique({
        //   where: {
        //     id: accountCreateResult.unwrap().id,
        //   },
        // });

        // expect(postUpdateAccount.id).toEqual(accountCreateResult.unwrap().id);
        // expect(postUpdateAccount.name).toEqual('Bulgarian Split Squat');
        // expect(postUpdateAccount.type).toEqual('Strength');
        // expect(postUpdateAccount.body_part).toEqual('Quads');
      });
    });
  });
});
