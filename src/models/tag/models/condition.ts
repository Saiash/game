import { Character } from '../../characters';
import { Item } from '../../characters/inventory/item';
import { Location } from '../../locations';
import { ObjectModel } from '../../locations/object';
import { Tag } from './tag';

export class Condition {
  private state: boolean;
  private conditions: conditions[];
  private outerConditions: conditions[];
  private existingConditions: string[];
  private owner: Character | Item | ObjectModel | Location;
  private tag: Tag;

  constructor(
    conditions: conditions[],
    outerConditions: conditions[],
    owner: Character | Item | ObjectModel | Location,
    tag: Tag
  ) {
    this.state = false;
    this.conditions = conditions || [];
    this.outerConditions = outerConditions || [];
    this.owner = owner;
    this.tag = tag;
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
    if (conditionType === 'status' || conditionType === 'notStatus') {
      const conditionValue = condition[conditionType];
      return this.testStatus(
        conditionValue,
        conditionType === 'notStatus' ? 'negation' : 'simple',
        actor
      );
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
    mod: 'simple' | 'negation',
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
    return mod === 'simple'
      ? result.every(r => r === true)
      : result.every(r => r === false);
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
  and?: condition[];
  or?: condition[];
};

export type condition = { [index: string]: conditionValue };

export type conditionValue = string[];
