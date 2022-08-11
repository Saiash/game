import { Character } from '../../characters';
import { Item } from '../../characters/inventory/item';
import { Location } from '../../locations';
import { ObjectModel } from '../../locations/object';

export class Condition {
  private state: boolean;
  private conditions: conditions[];
  private outerConditions: conditions[];
  private existingConditions: string[];
  private owner: Character | Item | ObjectModel | Location;

  constructor(
    conditions: conditions[],
    outerConditions: conditions[],
    owner: Character | Item | ObjectModel | Location
  ) {
    this.state = false;
    this.conditions = conditions || [];
    this.outerConditions = outerConditions || [];
    this.owner = owner;
    this.existingConditions = [];
    this.checkConditions();
  }

  checkConditions(outer: boolean = false, actor?: Character): boolean {
    this.existingConditions = [];
    const conditionsSet = outer ? this.outerConditions : this.conditions;
    const results = conditionsSet.map(conditionSet => {
      if (conditionSet.and) {
        const conditionsResults = conditionSet.and.map(condition => {
          return this.testCondition(condition, actor);
        });
        return conditionsResults.every(r => r === true);
      } else if (conditionSet.or) {
        const conditionsResults = conditionSet.or.map(condition => {
          return this.testCondition(condition, actor);
        });
        return conditionsResults.some(r => r === true);
      }
    });
    this.state = results.every(r => r === true);
    return this.state;
  }

  private testCondition(condition: condition, actor?: Character): boolean {
    const [conditionType] = Object.keys(condition);
    if (conditionType === 'status') {
      const conditionValue = condition.status;
      return this.testStatus(conditionValue, actor);
    } else if (
      conditionType === 'unknownLore' ||
      conditionType === 'knownLore'
    ) {
      const conditionValue = condition[conditionType];
      return this.testLore({ conditionType, conditionValue, actor });
    }
    return false;
  }

  private testStatus(
    conditionValue: conditionValue,
    actor?: Character | Item | ObjectModel | Location
  ): boolean {
    const source = actor || this.owner;
    const result = conditionValue.map(value => {
      this.existingConditions.push(value as string);
      if (value === 'locked') {
        return source.isLocked();
      } else {
        return source.hasStatus(value as string);
      }
    });
    return result.every(r => r === true);
  }

  private testLore({
    conditionType,
    conditionValue,
    actor,
  }: {
    conditionType: string;
    conditionValue: conditionValue;
    actor?: Character | Item | ObjectModel | Location;
  }): boolean {
    if (!(actor instanceof Character)) return false;
    const names = conditionValue as string[];
    const lores = actor.lore.getLoreByNames(names);
    return conditionType === 'knownLore'
      ? lores.length === names.length
      : lores.length === 0;
  }

  getState() {
    return this.state;
  }

  checkIfHasCondition(condition: string): boolean {
    return this.existingConditions.some(cond => cond === condition);
  }
}

export type conditions = {
  and?: [condition];
  or?: [condition];
};

export type condition = { [index: string]: conditionValue };

export type conditionValue = [string | number | { id?: string; name?: string }];
