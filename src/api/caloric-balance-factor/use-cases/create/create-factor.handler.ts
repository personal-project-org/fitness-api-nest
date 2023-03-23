import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaloricBalanceFactorRepository } from '../../repository/factor.repository';
import { CreateCaloricBalanceFactorCommand } from './create-factor.command';

@CommandHandler(CreateCaloricBalanceFactorCommand)
export class CreateCaloricBalanceFactorHandler
  implements ICommandHandler<CreateCaloricBalanceFactorCommand>
{
  constructor(
    private readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}

  async execute(command: CreateCaloricBalanceFactorCommand): Promise<any> {}
}

export abstract class CaloricBalanceFactorCreateErrorResponse extends Error {}

export class RepositoryCreationError extends CaloricBalanceFactorCreateErrorResponse {}
