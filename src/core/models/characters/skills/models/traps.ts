import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'traps',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//TODO:  Взлом-3*.

export const Traps = skillFabric({ skillSettings });
