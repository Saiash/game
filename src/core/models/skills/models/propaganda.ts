import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'propaganda',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { merchant: -5, psychology: -4 },
};

export const Propaganda = skillFabric({ skillSettings });
