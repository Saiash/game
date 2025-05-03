import { Character } from '../../characters';
import { ObjectModel } from '../../locations/object';

import { skillFabric, skillFabricType } from './index';
import { Item } from '../../items/item';
import { SkillResolver } from '../resolvers';
import { CheckResults } from '../types';

const skillSettings: skillFabricType = {
  code: 'lockpicking',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

class LockpickingResolver extends SkillResolver {
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

export const Lockpicking = skillFabric({
  skillSettings,
  resolverClass: LockpickingResolver,
});
