import { Condition } from './condition';

export class Tag {
  private name: string;
  private type: string;
  private difficulty: number;
  private conditions: Condition;
  private onSuccess: any;
  private onFail: any;

  constructor(input: {
    name: string;
    type: string;
    difficulty: number;
    conditions: any;
    onSuccess?: any;
    onFail?: any;
  }) {
    this.type = input.type;
    this.name = input.name;
    this.difficulty = input.difficulty;
    this.conditions = input.conditions;
  }
}
