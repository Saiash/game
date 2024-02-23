import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'boxing',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//при 8 вложенных опыта - +1 к урону, при 12 - +2

export const Boxing = skillFabric({ skillSettings });
