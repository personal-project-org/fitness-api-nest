import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result } from '@badrap/result';
import { GetCaloricBalanceFactorsCommand } from './get-factors.command';
import { CaloricBalanceFactorRepository } from '../../repository/factor.repository';
import { mapDbEntityToDomainEntity } from '../../repository/mapper';

@QueryHandler(GetCaloricBalanceFactorsCommand)
export class GetCaloricBalanceFactorsHandler
  implements IQueryHandler<GetCaloricBalanceFactorsCommand>
{
  constructor(
    private readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}
  async execute(command: GetCaloricBalanceFactorsCommand): Promise<any> {
    const getCaloricBalanceFactorsResult =
      await this.caloricBalanceFactorRepository.getCaloricBalanceFactors({
        accountId: command.accountId,
        date: command.date,
      });

    return getCaloricBalanceFactorsResult.map(
      (caloricFactorsFromSpecificDate) =>
        caloricFactorsFromSpecificDate.map((e) => mapDbEntityToDomainEntity(e)),
      () => new RepositoryRetrievalError(),
    );
  }
}

export abstract class GetCaloricBalanceFactorsErrorResponse extends Error {}

export class RepositoryRetrievalError extends GetCaloricBalanceFactorsErrorResponse {}
