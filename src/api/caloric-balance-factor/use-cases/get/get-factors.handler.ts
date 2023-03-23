import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result } from '@badrap/result';
import { GetCaloricBalanceFactorsCommand } from './get-factors.command';
import { CaloricBalanceFactorRepository } from '../../repository/factor.repository';

@QueryHandler(GetCaloricBalanceFactorsCommand)
export class GetCaloricBalanceFactorsHandler
  implements IQueryHandler<GetCaloricBalanceFactorsCommand>
{
  constructor(
    private readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}
  async execute(command: GetCaloricBalanceFactorsCommand): Promise<any> {}
}
