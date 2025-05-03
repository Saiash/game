import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'carousing',
  parentAttrCode: 'ht',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: {},
};

//+2 к реакции или другим броскам, -2 или проблемы в случае провала

export const Carousing = skillFabric({ skillSettings });
