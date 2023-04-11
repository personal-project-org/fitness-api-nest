import { AccountQueryCommand } from '../shared/account-query.command';

export class GetDailyReportCommand extends AccountQueryCommand {
  constructor(public readonly date: Date, public readonly accountId: string) {
    super();
  }
}
