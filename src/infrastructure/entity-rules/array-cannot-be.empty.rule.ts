import { IRule } from './rule.check';

export class ArrayCannotBeEmptyRule implements IRule {
  constructor(
    private readonly arrayName: string,
    private readonly actualArray: Number[],
  ) {}

  isBroken(): boolean {
    return !this.actualArray;
  }

  thenThrow(): void {
    throw new Error(`${this.arrayName} cannot be empty.`);
  }
}
