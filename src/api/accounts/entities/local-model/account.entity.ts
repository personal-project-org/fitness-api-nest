import { checkRule } from 'src/infrastructure/entity-rules/rule.check';
import { StringCannotBeEmptyRule } from 'src/infrastructure/entity-rules/string-cannot-be.empty.rule';

export class Account {
  private _id: string;
  private _username: string;
  private _password: string;
  private _calorie_goal: number;
  private _protein_goal: number;
  private _carb_goal: number;
  private _fat_goal: number;

  constructor(
    id: string,
    username: string,
    password: string,
    calorie_goal: number,
    protein_goal: number,
    carb_goal: number,
    fat_goal: number,
  ) {
    checkRule(new StringCannotBeEmptyRule('id', id));
    checkRule(new StringCannotBeEmptyRule('username', username));
    checkRule(new StringCannotBeEmptyRule('password', password));
    checkRule(new StringCannotBeEmptyRule('calorie_goal', calorie_goal));
    checkRule(new StringCannotBeEmptyRule('protein_goal', protein_goal));

    this._id = id;
    this._username = username;
    this._password = password;
    this._calorie_goal = calorie_goal;
    this._protein_goal = protein_goal;
    this._carb_goal = carb_goal;
    this._fat_goal = fat_goal;
  }

  public get id(): string {
    return this._id;
  }
  public get username(): string {
    return this._username;
  }
  public get password(): string {
    return this._password;
  }
  public get calorie_goal(): number {
    return this._calorie_goal;
  }
  public get protein_goal(): number {
    return this._protein_goal;
  }
  public get carb_goal(): number {
    return this._carb_goal;
  }
  public get fat_goal(): number {
    return this._fat_goal;
  }
}
