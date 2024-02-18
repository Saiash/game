import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'whip',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { kusari: -3, monowireWhip: -3, forceWhip: -3 },
};

export const Whip = skillFabric(skillSettings);
