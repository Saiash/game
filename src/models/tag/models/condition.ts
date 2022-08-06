import { Character } from '../../characters';
import { Item } from '../../characters/inventory/item';
import { Location } from '../../locations';
import { ObjectModel } from '../../locations/object';

export class Condition {
  private state: boolean;
  private conditions: conditions[];
  private existingConditions: string[];
  private owner: Character | Item | ObjectModel | Location;

  constructor(
    conditions: conditions[],
    owner: Character | Item | ObjectModel | Location
  ) {
    this.state = false;
    this.conditions = conditions || [];
    this.owner = owner;
    this.existingConditions = [];
    this.checkConditions();
  }

  checkConditions(actor?: Character): boolean {
    this.existingConditions = [];
    const results = this.conditions.map(conditionSet => {
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

  private testCondition(
    condition: condition | innerCondition,
    actor?: Character
  ): boolean {
    if (condition.outerCondition) {
      return this.testCondition(
        condition.outerCondition as innerCondition,
        actor
      );
    }
    const [conditionType] = Object.keys(condition);
    if (conditionType === 'status') {
      const conditionValue = (condition as innerCondition).status;
      return this.testStatus(conditionValue);
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

export type condition = innerCondition | { outerCondition: innerCondition };

export type innerCondition = {
  [index: string]: conditionValue;
};

export type conditionValue = [string | number | { id?: string; name?: string }];
