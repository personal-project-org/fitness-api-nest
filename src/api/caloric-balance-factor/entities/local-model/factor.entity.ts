import { checkRule } from 'src/infrastructure/entity-rules/rule.check';
import { StringCannotBeEmptyRule } from 'src/infrastructure/entity-rules/string-cannot-be.empty.rule';

export class CaloricBalanceFactor {
  private _id: string;
  private _accountId: string;
  private _exerciseId: string;
  private _date: Date;
  private _balanceFactorType: string;
  private _foodDetails: JSON;
  private _exerciseDetails: JSON;
  private _caloriesBurned: number;
  private _caloriesConsumed: number;
  private _protein: number;
  private _carbs: number;
  private _fat: number;

  constructor(
    id: string,
    accountId: string,
    exerciseId: string,
    date: Date,
    balanceFactorType?: string,
    foodDetails?: JSON,
    exerciseDetails?: JSON,
    caloriesBurned?: number,
    caloriesConsumed?: number,
    protein?: number,
    carbs?: number,
    fat?: number,
  ) {
    checkRule(new StringCannotBeEmptyRule('id', id));
    checkRule(new StringCannotBeEmptyRule('accountId', accountId));

    this._id = id;
    this._accountId = accountId;
    this._exerciseId = exerciseId;
    this._date = date;
    this._balanceFactorType = balanceFactorType || undefined;
    this._foodDetails = foodDetails || undefined;
    this._exerciseDetails = exerciseDetails || undefined;
    this._caloriesBurned = caloriesBurned || undefined;
    this._caloriesConsumed = caloriesConsumed || undefined;
    this._protein = protein || undefined;
    this._carbs = carbs || undefined;
    this._fat = fat || undefined;
  }

  public get id(): string {
    return this._id;
  }
  public get accountId(): string {
    return this._accountId;
  }
  public get exerciseId(): string {
    return this._exerciseId;
  }
  public get date(): Date {
    return this._date;
  }
  public get balanceFactorType(): string {
    return this._balanceFactorType;
  }
  public get foodDetails(): JSON | undefined {
    return this._foodDetails;
  }
  public get exerciseDetails(): JSON | undefined {
    return this._exerciseDetails;
  }
  public get caloriesConsumed(): number | undefined {
    return this._caloriesConsumed;
  }
  public get caloriesBurned(): number | undefined {
    return this._caloriesBurned;
  }
  public get protein(): number | undefined {
    return this._protein;
  }
  public get carbs(): number | undefined {
    return this._carbs;
  }
  public get fat(): number | undefined {
    return this._fat;
  }
}

export enum BalanceFactorType {
  Food,
  Exercise,
}
