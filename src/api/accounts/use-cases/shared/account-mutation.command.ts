import { ICommand } from '@nestjs/cqrs';

export abstract class AccountMutationCommand implements ICommand {}
