import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaloricBalanceFactorRepository } from '../../repository/factor.repository';
import { UpdateCaloricBalanceFactorCommand } from './update-factor.command';

@CommandHandler(UpdateCaloricBalanceFactorCommand)
export class UpdateCaloricBalanceFactorHandler
  implements ICommandHandler<UpdateCaloricBalanceFactorCommand>
{
  constructor(
    private readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}
  async execute(): Promise<any> {}
}
