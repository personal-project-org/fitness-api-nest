import { IRule } from './rule.check';

export class StringCannotBeEmptyRule implements IRule {
  constructor(
    private readonly fieldName: string,
    private readonly fieldValue: string,
  ) {}

  isBroken(): boolean {
    return !this.fieldValue || this.fieldValue.trim() === '';
  }

  thenThrow(): void {
    throw new Error(`${this.fieldName} cannot be empty.`);
  }
}
