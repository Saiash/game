import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'lance',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { spear: -3 },
};

export const Lance = skillFabric(skillSettings);
