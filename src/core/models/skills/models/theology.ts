import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'theology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { religiousRitual: -4 },
};

// Рели- гиозный обряд (той же религии) -4

export const Theology = skillFabric({ skillSettings });
