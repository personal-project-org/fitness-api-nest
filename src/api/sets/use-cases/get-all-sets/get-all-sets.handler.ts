import { SetRepository } from '../../repository/set.repository';
import { GetAllSetsCommand } from './get-all-sets.command';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllSetsCommand)
export class GetAllSetsHandler {
  constructor(private readonly setRepository: SetRepository) {}

  async execute(): Promise<any> {
    const getAllSetsResult = await this.setRepository.getAllSets();
    return getAllSetsResult.map(
      (allFood) => allFood,
      () => new RepositoryGetAllError(),
    );
  }
}

export abstract class GetAllSetsErrorResponse extends Error {}

export class RepositoryGetAllError extends GetAllSetsErrorResponse {}
