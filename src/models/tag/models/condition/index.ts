import { CTX } from '../../../../types';
import { Character } from '../../../characters';
import { Item } from '../../../characters/inventory/item';
import { Location } from '../../../locations';
import { ObjectModel } from '../../../locations/object';
import { Tag } from '../tag';
import { conditionTestsVariants } from './models';

export class Condition {
  private state: boolean;
  private conditions: conditions[];
  private outerConditions: conditions[];
  private existingConditions: string[];
  private owner: Character | Item | ObjectModel | Location;
  private ctx: CTX;

  constructor(data: {
    conditions: conditions[];
    owner: Character | Item | ObjectModel | Location;
    ctx: CTX;
    outerConditions?: conditions[];
  }) {
    const { conditions, outerConditions, owner, ctx } = data;
    this.state = false;
    this.conditions = conditions || [];
    this.outerConditions = outerConditions || [];
    this.owner = owner;
    this.ctx = ctx;
    this.existingConditions = [];
    this.checkConditions();
  }

  checkConditions(actor?: Character): boolean {
    this.existingConditions = [];
    const results = [
      ...this.outerConditions.map(c => {
        return { ...c, type: 'outer' };
      }),
      ...this.conditions.map(c => {
        return { ...c, type: 'inner' };
      }),
    ].map(conditionSet => {
      const arg = conditionSet.and ? 'and' : 'or';
      const type = conditionSet.type;
      if (type === 'outer' && !actor) return true;
      const conditionsResults = conditionSet[arg]?.map(condition => {
        return this.testCondition({
          condition,
          ...(type === 'inner' ? {} : { actor }),
        });
      }) as boolean[];
      return arg === 'and'
        ? conditionsResults.every(r => r === true)
        : conditionsResults.some(r => r === true);
    });
    this.state = results.every(r => r === true);
    return this.state;
  }

  private testCondition({
    condition,
    actor,
  }: {
    condition: condition;
    actor?: Character;
  }): boolean {
    const [conditionType] = Object.keys(condition);
    const conditionValue = condition[conditionType];
    if (!conditionTestsVariants[conditionType])
      throw new Error(
        'no such condition rule Condition -> testCondition ' + conditionType
      );
    return conditionTestsVariants[conditionType]({
      condition: this,
      conditionValue,
      conditionType,
      actor: actor || this.owner,
      ctx: this.ctx,
    });
  }

  getState() {
    return this.state;
  }

  checkIfHasCondition(condition: string): boolean {
    return this.existingConditions.some(cond => cond === condition);
  }

  addExistingCondition(value: string): void {
    this.existingConditions.push(value);
  }
}

export type conditions = {
  and?: condition[];
  or?: condition[];
};

export type condition = { [index: string]: conditionValue };

export type conditionValue = string[];
