import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'driving',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// -2 за качество плохой техники, -2 за незнакомый тип, -2 при плохих условиях

export const Driving = skillFabric({ skillSettings });
