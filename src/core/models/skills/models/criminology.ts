import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'criminology',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: { psychology: -4 },
};

export const Criminology = skillFabric({ skillSettings });
