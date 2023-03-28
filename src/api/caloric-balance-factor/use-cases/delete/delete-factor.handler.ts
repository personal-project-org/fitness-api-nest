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
  async execute(command: DeleteCaloricBalanceFactorCommand): Promise<any> {
    const selectedCaloricBalanceFactor =
      await this.caloricBalanceFactorRepository.getCaloricBalanceFactors({
        accountId: command.accountId,
        ids: command.ids,
      });

    if (!selectedCaloricBalanceFactor) {
      return new ForbiddenDeleteError();
    }

    const caloricBalanceFactorDeleteResult =
      await this.caloricBalanceFactorRepository.deleteCaloricBalanceFactors({
        accountId: command.accountId,
        ids: command.ids,
        exerciseId: undefined,
        startingFrom: undefined,
        endingWith: undefined,
        balanceFactorType: undefined,
      });

    return caloricBalanceFactorDeleteResult.map(
      (createdCaloricBalanceFactor) => createdCaloricBalanceFactor,
      () => new RepositoryDeleteError(),
    );
  }
}

export abstract class CaloricBalanceFactorDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends CaloricBalanceFactorDeleteErrorResponse {}

export class ForbiddenDeleteError extends CaloricBalanceFactorDeleteErrorResponse {}
