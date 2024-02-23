import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'connoisseur',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: {},
};

export const Connoisseur = skillFabric({ skillSettings });
