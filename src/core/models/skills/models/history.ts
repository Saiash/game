import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'history',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const History = skillFabric({ skillSettings });
