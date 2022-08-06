import { SkillResolver } from '.';
import { CheckResults } from '..';
import { Character } from '../..';
import { Item } from '../../inventory/item';

export class Lockpicking extends SkillResolver {
  resolve({
    result,
    sourceActor,
    target,
  }: {
    result: CheckResults;
    sourceActor?: Character;
    target?: Character | Item;
  }): boolean {
    if (!result.result) return false;
    if (target instanceof Item) {
      target.unlock();
    }
    return true;
  }
}
