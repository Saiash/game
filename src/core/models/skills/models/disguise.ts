import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'disguise',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { makeup: -3 },
};

export const Disguise = skillFabric({ skillSettings });
