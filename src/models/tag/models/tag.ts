import { Character } from '../../characters';
import { Item } from '../../characters/inventory/item';
import { Location } from '../../locations';
import { ObjectModel } from '../../locations/object';
import { Condition } from './condition';

let ID = 1;

export type TagInput = {
  name: string;
  type: string;
  value: number;
  target: {
    type: string;
    name: string;
  };
  conditions: any;
  onSuccess: any;
  onFail: any;
};

export class Tag {
  private id: number;
  private name: string;
  private type: string;
  private value: number;
  private target: {
    type: string;
    name: string;
  };
  private conditions: Condition;
  private onSuccess: any;
  private onFail: any;
  private owner: Character | Item | ObjectModel | Location;

  constructor(
    input: TagInput,
    owner: Character | Item | ObjectModel | Location
  ) {
    this.id = ID++;
    this.type = input.type;
    this.name = input.name;
    this.value = input.value;
    this.target = input.target;
    this.onSuccess = input.onSuccess;
    this.onFail = input.onFail;
    this.owner = owner;
    this.conditions = new Condition(input.conditions, owner);
  }

  checkConditions(actor?: Character) {
    return this.conditions.checkConditions(actor);
  }

  getConditionState() {
    return this.conditions.getState();
  }

  getType() {
    return this.type;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getOwner() {
    return this.owner;
  }

  getValue() {
    return this.value;
  }

  checkIfHasCondition(condition: string): boolean {
    return this.conditions.checkIfHasCondition(condition);
  }
}
