import { CommandBus, QueryBus } from '@nestjs/cqrs';

export class AccountResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
}
