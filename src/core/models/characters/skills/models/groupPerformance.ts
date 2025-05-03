import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'groupPerformance',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1800,
  cultureBased: false,
  relativeSkills: {},
};

export const GroupPerformance = skillFabric({ skillSettings });
