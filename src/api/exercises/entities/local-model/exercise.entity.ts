import { ArrayCannotBeEmptyRule } from 'src/infrastructure/entity-rules/array-cannot-be.empty.rule';
import { checkRule } from 'src/infrastructure/entity-rules/rule.check';
import { StringCannotBeEmptyRule } from 'src/infrastructure/entity-rules/string-cannot-be.empty.rule';

export class Exercise {
  private _id: string;
  private _name: string;
  private _type: string;
  private _body_part: string;

  constructor(id: string, name: string, type: string, body_part: string) {
    checkRule(new StringCannotBeEmptyRule('id', id));
    checkRule(new StringCannotBeEmptyRule('name', name));
    checkRule(new StringCannotBeEmptyRule('type', type));
    checkRule(new StringCannotBeEmptyRule('body_part', body_part));

    this._id = id;
    this._name = name;
    this._type = type;
    this._body_part = body_part;
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get type(): string {
    return this._type;
  }
  public get body_part(): string {
    return this._body_part;
  }
}
