import { SkillResolver } from '.';
import { CheckResults } from '..';
import { Character } from '../..';
import { ObjectModel } from '../../../locations/object';
import { Item } from '../../inventory/item';

export class Lockpicking extends SkillResolver {
  commonResolve({
    result,
    sourceActor,
    target,
  }: {
    result: CheckResults;
    sourceActor?: Character;
    target?: Character | Item;
  }): boolean {
    if (!result.result) return false;
    if (target instanceof Item || target instanceof ObjectModel) {
      target.unlock();
    }
    return true;
  }
}
