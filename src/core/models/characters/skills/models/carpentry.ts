import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'carpentry',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

//+5 if being tutored

export const Carpentry = skillFabric({ skillSettings });
