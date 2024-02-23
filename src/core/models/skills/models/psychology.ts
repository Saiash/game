import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'psychology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: { sociology: -4 },
};

export const Psychology = skillFabric({ skillSettings });
