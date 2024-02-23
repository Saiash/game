import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'mechanic',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: {},
};

// Ин- женерия (та же)-4, Слесарь-5.

export const Mechanic = skillFabric({ skillSettings });
