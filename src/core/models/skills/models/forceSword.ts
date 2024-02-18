import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'forceSword',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { shortsword: -3, rapier: -2, twoHandedSword: -4 },
};

export const ForceSword = skillFabric(skillSettings);
