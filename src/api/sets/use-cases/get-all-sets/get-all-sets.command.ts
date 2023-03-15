import { SetQueryCommand } from '../../shared/set-query.command';
import { SetRepository } from '../../repository/set.repository';

export class GetAllSetsCommand extends SetQueryCommand {
  constructor() {
    super();
  }
}
