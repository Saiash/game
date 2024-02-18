import { Character } from '../../characters';
import { Item } from '../../characters/inventory/item';
import { CheckResults } from '../../characters/skills';
import { SkillResolver } from '../../characters/skills/resolvers';
import { ObjectModel } from '../../locations/object';

import { skillFabric, skillFabricType } from './index';

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

export const Lockpicking = skillFabric(skillSettings, LockpickingResolver);
