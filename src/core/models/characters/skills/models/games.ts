import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'games',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: {},
};

// -2 за незнакомство с игрой

export const Games = skillFabric({ skillSettings });
