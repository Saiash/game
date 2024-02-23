import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'research',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { writing: -3 },
};

export const Research = skillFabric({ skillSettings });
