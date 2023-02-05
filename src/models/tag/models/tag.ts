import { ActionPayload } from '../../actionConnector';
import { Character } from '../../characters';
import { Item } from '../../characters/inventory/item';
import { Location } from '../../locations';
import { ObjectModel } from '../../locations/object';
import { Condition, conditions } from './condition';

let ID = 1;

export type EventAction = {
  type: string;
  effect: string[] | string;
  conditions?: conditions[];
  outerConditions?: conditions[];
};

export type TagInput = {
  name: string;
  type: string;
  value: number;
  target: {
    type: string;
    name: string;
  };
  conditions: conditions[];
  outerConditions: conditions[];
  onSuccess: EventAction[];
  onFail: EventAction[];
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
  private onSuccess: EventAction[];
  private onFail: EventAction[];
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
    this.conditions = new Condition(
      input.conditions,
      input.outerConditions,
      owner,
      this
    );
  }

  checkConditions({ actor }: { actor?: Character }) {
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

  getOnSuccess() {
    return this.onSuccess;
  }

  getOnFail() {
    return this.onFail;
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

  getTarget() {
    return this.target;
  }
}
