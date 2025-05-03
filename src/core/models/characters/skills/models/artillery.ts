import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'artillery',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Artillery = skillFabric({ skillSettings });
