import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaloricBalanceFactorRepository } from '../../repository/factor.repository';
import { DeleteCaloricBalanceFactorCommand } from './delete-factor.command';

@CommandHandler(DeleteCaloricBalanceFactorCommand)
export class DeleteCaloricBalanceFactorHandler
  implements ICommandHandler<DeleteCaloricBalanceFactorCommand>
{
  constructor(
    private readonly caloricBalanceFactorRepository: CaloricBalanceFactorRepository,
  ) {}
  async execute(command: DeleteCaloricBalanceFactorCommand): Promise<any> {}
}
