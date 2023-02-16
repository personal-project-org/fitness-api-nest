import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FoodRepository } from '../../repository/food.repository';
import { GetAllFoodCommand } from './get-all.command';

@QueryHandler(GetAllFoodCommand)
export class GetAllFoodHandler implements IQueryHandler<GetAllFoodCommand> {
  constructor(private readonly foodRepository: FoodRepository) {}
  async execute(query: GetAllFoodCommand): Promise<any> {
    const getAllFoodResult = await this.foodRepository.getAllFoods();
    return getAllFoodResult.map(
      (allFood) => allFood,
      () => new RepositoryGetAllError(),
    );
  }
}

export abstract class RepositoryGetAllErrorResponse extends Error {}

export class RepositoryGetAllError extends RepositoryGetAllErrorResponse {}