import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'gardening',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { farming: -3 },
};

export const Gardening = skillFabric({ skillSettings });
