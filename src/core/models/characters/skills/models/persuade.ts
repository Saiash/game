import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'persuade',
  parentAttrCode: 'will',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

// Быстрое состязание - до +3

export const Persuade = skillFabric({ skillSettings });
