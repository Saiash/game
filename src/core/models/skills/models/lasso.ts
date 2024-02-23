import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'lasso',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Lasso = skillFabric({ skillSettings });
