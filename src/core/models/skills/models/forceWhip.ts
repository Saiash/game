import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'forceWhip',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { kusari: -3, monowireWhip: -3, whip: -3 },
};

export const ForceWhip = skillFabric(skillSettings);
