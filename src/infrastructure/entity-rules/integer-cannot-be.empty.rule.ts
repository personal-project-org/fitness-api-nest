import { IRule } from './rule.check';

export class IntegerCannotBeEmptyRule implements IRule {
  constructor(
    private readonly fieldName: string,
    private readonly fieldValue: number,
  ) {}

  isBroken(): boolean {
    return !this.fieldValue;
  }

  thenThrow(): void {
    throw new Error(`${this.fieldName} cannot be empty.`);
  }
}
