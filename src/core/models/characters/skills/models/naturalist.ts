import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'naturalist',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { biology: -3 },
};

export const Naturalist = skillFabric({ skillSettings });
