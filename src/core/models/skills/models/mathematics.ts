import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'mathematics',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: {},
};

export const Mathematics = skillFabric({ skillSettings });
