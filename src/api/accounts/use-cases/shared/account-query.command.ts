import { IQuery } from '@nestjs/cqrs';

export abstract class AccountQueryCommand implements IQuery {}
