import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sports',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

//TODO:  каждый спорт - отдельное умение

export const Sports = skillFabric({ skillSettings });
