import { checkRule } from '../shared/rule.check';
import { StringCannotBeEmptyRule } from '../shared/rules/string-cannot-be.empty.rule';

export class Food {
  private _id: string;
  private _name: string;
  private _calories: string;
  private _protein: string;
  private _carbs: string;
  private _fats: string;

  constructor(
    id: string,
    name: string,
    calories: string,
    protein: string,
    carbs: string,
    fats: string,
  ) {
    checkRule(new StringCannotBeEmptyRule('id', id));
    checkRule(new StringCannotBeEmptyRule('name', name));
    checkRule(new StringCannotBeEmptyRule('calories', calories));
    checkRule(new StringCannotBeEmptyRule('protein', protein));
    checkRule(new StringCannotBeEmptyRule('carbs', carbs));
    checkRule(new StringCannotBeEmptyRule('fats', fats));

    this._id = id;
    this._name = name;
    this._calories = calories;
    this._protein = protein;
    this._carbs = carbs;
    this._fats = fats;
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get calories(): string {
    return this._calories;
  }

  public get carbs(): string {
    return this._carbs;
  }
  public get fats(): string {
    return this._fats;
  }
}
