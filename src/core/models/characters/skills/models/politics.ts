import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'politics',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { diplomacy: -5 },
};

//выборы - быстрое состязание

export const Politics = skillFabric({ skillSettings });
