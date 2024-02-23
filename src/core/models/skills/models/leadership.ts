import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'leadership',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: {},
};

// +1 на все броски кроме боя

export const Leadership = skillFabric({ skillSettings });
