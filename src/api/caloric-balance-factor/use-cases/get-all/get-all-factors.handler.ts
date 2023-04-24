import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllCaloricBalanceFactorsCommand } from './get-all-factors.command';
import { CaloricBalanceFactorRepository } from '../../repository/factor.repository';

@QueryHandler(GetAllCaloricBalanceFactorsCommand)
export class GetAllCaloricBalanceFactorsHandler
  implements IQueryHandler<GetAllCaloricBalanceFactorsCommand>
{
  constructor(
    private readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}
  async execute(): Promise<any> {}
}
