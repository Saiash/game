import { TagSystem } from '..';
import { CTX } from '../../../../types';
import { Character } from '../../../models/characters';
import { Condition, conditions } from './condition';
import { TagInput as TagInputType } from '../../../../core/managers/tag/models/tag';

let ID = 1;

export type EventAction = {
  type: string;
  effect: string[] | string | TagInputType;
  conditions?: conditions[];
  outerConditions?: conditions[];
};

export type TagInput = {
  name: string;
  type: string;
  value: string;
  target: {
    type: string;
    name: string;
  };
  modType?: string;
  length?: string;
  modTarget?: string;
  conditions?: conditions[];
  outerConditions?: conditions[];
  onSuccess?: EventAction[];
  onFail?: EventAction[];
};

export class Tag {
  private id: number;
  private name: string;
  private type: string;
  private modType?: string;
  private length: number;
  private modTarget?: string;
  private value: number;
  private target:
    | {
        type: string;
        name: string;
      }
    | string[];
  private conditions?: Condition;
  private onSuccess?: EventAction[];
  private onFail?: EventAction[];
  private owner: TagSystem['owner'];
  private ctx: CTX;

  constructor(input: TagInput, owner: TagSystem['owner'], ctx: CTX) {
    this.id = ID++;
    this.type = input.type;
    this.modType = input.modType;
    this.modTarget = input.modTarget;
    this.length = parseInt(input.length || '0');
    this.name = input.name;
    this.value = parseInt(input.value);
    this.target = input.target;
    this.onSuccess = input.onSuccess;
    this.onFail = input.onFail;
    this.owner = owner;
    this.ctx = ctx;
    this.conditions = new Condition({
      conditions: input.conditions,
      outerConditions: input.outerConditions,
      owner,
      ctx,
    });
    if (this.length > 0) {
      ctx.gameData.timeManager.addExpiringEffect(this);
    }
  }

  checkConditions({ actor }: { actor?: Character }): boolean {
    if (!this.conditions) return true;
    return this.conditions.checkConditions(actor);
  }

  getConditionState(): boolean {
    if (!this.conditions) return true;
    return this.conditions.getState();
  }

  getType(): string {
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

  getModType(): string {
    return this.modType || '';
  }
  getModTarget(): string {
    return this.modTarget || '';
  }

  checkIfHasCondition(condition: string): boolean {
    if (!this.conditions) return false;
    return this.conditions.checkIfHasCondition(condition);
  }

  getTarget<T>(): T {
    return this.target as unknown as T;
  }

  getLength(): number {
    return this.length;
  }
}
