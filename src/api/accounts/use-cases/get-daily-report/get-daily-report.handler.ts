import { Result } from '@badrap/result';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CaloricBalanceFactor } from '@prisma/client';
import { CaloricBalanceFactorRepository } from 'src/api/caloric-balance-factor/repository/factor.repository';
import { DailyReportObjectType } from '../../entities/gql-models/daily-report.object-type';
import { AccountRepository } from '../../repository/account.repository';
import { GetDailyReportCommand } from './get-daily-report.command';

@QueryHandler(GetDailyReportCommand)
export class GetDailyReportHandler
  implements IQueryHandler<GetDailyReportCommand>
{
  constructor(
    public readonly accountRepository: AccountRepository,
    public readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}

  async execute(query: GetDailyReportCommand): Promise<any> {
    const findAccountResult = await this.accountRepository.findById(
      query.accountId,
    );

    if (findAccountResult.isErr) {
      return Result.err(new InvalidAccountIdError());
    }

    const caloricBalanceFactorsFromDate =
      await this.caloricBalanceFactorRepository.getCaloricBalanceFactors({
        accountId: query.accountId,
        date: query.date,
      });

    if (caloricBalanceFactorsFromDate.isErr) {
      return Result.err(new CaloricBalanceFactorRepositoryError());
    }

    const dailyReportTotal = this.factorsArrayToDailyReportTotal(
      caloricBalanceFactorsFromDate.unwrap(),
    );

    return Result.ok({
      username: findAccountResult.unwrap().username,
      accountId: findAccountResult.unwrap().id,
      date: query.date,
      caloriesBurned: dailyReportTotal.caloriesBurned,
      caloriesConsumed: dailyReportTotal.caloriesConsumed,
      calorieTotal: dailyReportTotal.calorieTotal,
      totalProtein: dailyReportTotal.totalProtein,
      totalCarbs: dailyReportTotal.totalCarbs,
      totalFat: dailyReportTotal.totalFat,
    } as DailyReportObjectType);
  }

  factorsArrayToDailyReportTotal(
    caloricBalanceFactors: CaloricBalanceFactor[],
  ): DailyReportTotal {
    let TcaloriesBurned = 0;
    let TcaloriesConsumed = 0;
    let TtotalProtein = 0;
    let TtotalCarbs = 0;
    let TtotalFat = 0;
    let calorieTotal = 0;

    caloricBalanceFactors.forEach((e) => {
      if (e.caloriesBurned) {
        TcaloriesBurned += e.caloriesBurned;
      }
      if (e.caloriesConsumed) {
        TcaloriesConsumed += e.caloriesConsumed;
      }
      if (e.protein) {
        TtotalProtein += e.protein;
      }
      if (e.carbs) {
        TtotalCarbs += e.carbs;
      }
      if (e.fat) {
        TtotalFat += e.fat;
      }
    });

    calorieTotal = TcaloriesConsumed - TcaloriesBurned;

    const retVal = {
      caloriesBurned: TcaloriesBurned,
      caloriesConsumed: TcaloriesConsumed,
      totalProtein: TtotalProtein,
      totalCarbs: TtotalCarbs,
      totalFat: TtotalFat,
      calorieTotal,
    } as DailyReportTotal;

    // console.log(JSON.stringify(retVal, null, 2));

    return retVal;
  }
}

interface DailyReportTotal {
  caloriesBurned: number;
  caloriesConsumed: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  calorieTotal: number;
}

export abstract class GetDailyReportErrorResponse extends Error {}

export class InvalidAccountIdError extends GetDailyReportErrorResponse {}

export class CaloricBalanceFactorRepositoryError extends GetDailyReportErrorResponse {}
