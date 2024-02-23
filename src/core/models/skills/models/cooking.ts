import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'cooking',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { housekeeping: -5 },
};

export const Cooking = skillFabric({ skillSettings });
