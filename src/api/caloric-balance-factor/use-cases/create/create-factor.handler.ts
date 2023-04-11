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

  async execute(command: CreateCaloricBalanceFactorCommand): Promise<any> {
    const caloricBalanceFactorCreateResult =
      await this.caloricBalanceFactorRepository.create({
        accountId: command.accountId,
        exerciseId: command.exerciseId,
        date: command.date,
        balanceFactorType: command.balanceFactorType,
        caloriesBurned: command.caloriesBurned,
        caloriesConsumed: command.caloriesConsumed,
        protein: command.protein,
        carbs: command.carbs,
        fat: command.fat,
      });

    return caloricBalanceFactorCreateResult.map(
      (createdCaloricBalanceFactor) => createdCaloricBalanceFactor,
      () => new RepositoryCreationError(),
    );
  }
}

export abstract class CaloricBalanceFactorCreateErrorResponse extends Error {}

export class RepositoryCreationError extends CaloricBalanceFactorCreateErrorResponse {}
