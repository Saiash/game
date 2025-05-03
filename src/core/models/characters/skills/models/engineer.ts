import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'engineer',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const Engineer = skillFabric({ skillSettings });
