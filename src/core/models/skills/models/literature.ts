import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'literature',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Literature = skillFabric({ skillSettings });
