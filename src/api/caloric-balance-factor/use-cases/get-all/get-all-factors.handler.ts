import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result } from '@badrap/result';
import { GetAllCaloricBalanceFactorsCommand } from './get-all-factors.command';

@QueryHandler(GetAllCaloricBalanceFactorsCommand)
export class GetAllCaloricBalanceFactorsHandler
  implements IQueryHandler<GetAllCaloricBalanceFactorsCommand>
{
  constructor(
    private readonly CaloricBalanceFactorsRepository: CaloricBalanceFactorsRepository,
  ) {}
  async execute(command: GetAllCaloricBalanceFactorsCommand): Promise<any> {}
}
