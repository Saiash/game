import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'MonowireWhip',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { kusari: -3, whip: -3, forceWhip: -3 },
};

export const MonowireWhip = skillFabric(skillSettings);
