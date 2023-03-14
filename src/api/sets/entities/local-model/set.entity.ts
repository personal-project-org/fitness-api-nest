import { checkRule } from 'src/infrastructure/entity-rules/rule.check';
import { StringCannotBeEmptyRule } from 'src/infrastructure/entity-rules/string-cannot-be.empty.rule';
import { IntegerCannotBeEmptyRule } from 'src/infrastructure/entity-rules/integer-cannot-be.empty.rule';

export class Set {
  private _id: string;
  private _reps: number;
  private _weight: number;
  private _date: Date;
  private _exerciseId: string;

  constructor(
    id: string,
    reps: number,
    exerciseId: string,
    weight?: number,
    date?: Date,
  ) {
    checkRule(new StringCannotBeEmptyRule('id', id));
    checkRule(new IntegerCannotBeEmptyRule('reps', reps));

    this._id = id;
    this._reps = reps;
    this._exerciseId = exerciseId;
    this._weight = weight || 0;
    this._date = date || new Date();
  }

  public get id(): string {
    return this._id;
  }
  public get exerciseId(): string {
    return this._exerciseId;
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
