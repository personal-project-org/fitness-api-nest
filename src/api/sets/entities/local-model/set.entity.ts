import { checkRule } from '../../../../infrastructure/entity-rules/rule.check';
import { StringCannotBeEmptyRule } from '../../../../infrastructure/entity-rules/string-cannot-be.empty.rule';
import { IntegerCannotBeEmptyRule } from '../../../../infrastructure/entity-rules/integer-cannot-be.empty.rule';

export class Set {
  private _id: string;
  private _reps: number;
  private _weight: number;
  private _date: Date;
  private _exerciseId: string;
  private _accountId: string;

  constructor(
    id: string,
    reps: number,
    exerciseId: string,
    accountId: string,
    weight?: number,
    date?: Date,
  ) {
    checkRule(new StringCannotBeEmptyRule('id', id));
    checkRule(new IntegerCannotBeEmptyRule('reps', reps));
    checkRule(new StringCannotBeEmptyRule('accountId', accountId));
    checkRule(new StringCannotBeEmptyRule('exerciseId', exerciseId));

    this._id = id;
    this._reps = reps;
    this._exerciseId = exerciseId;
    this._accountId = accountId;
    this._weight = weight || 0;
    this._date = date || new Date();
  }

  public get id(): string {
    return this._id;
  }
  public get exerciseId(): string {
    return this._exerciseId;
  }
  public get accountId(): string {
    return this._accountId;
  }
  public get reps(): number {
    return this._reps;
  }
  public get weight(): number {
    return this._weight;
  }
  public get date(): Date {
    return this._date;
  }
}
