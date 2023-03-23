import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result } from '@badrap/result';
import { GetCaloricBalanceFactorsCommand } from './get-factors.command';

@QueryHandler(GetCaloricBalanceFactorsCommand)
export class GetCaloricBalanceFactorsHandler
  implements IQueryHandler<GetCaloricBalanceFactorsCommand>
{
  constructor(
    private readonly caloricBalanceFactorsRepository: CaloricBalanceFactorsRepository,
  ) {}
  async execute(command: GetCaloricBalanceFactorsCommand): Promise<any> {}
}
