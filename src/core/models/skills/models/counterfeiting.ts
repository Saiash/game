import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'counterfeiting',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 28800,
  cultureBased: false,
  relativeSkills: { forgery: -2 },
};

export const Counterfeiting = skillFabric({ skillSettings });
