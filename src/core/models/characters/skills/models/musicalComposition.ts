import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'musicalComposition',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

// Музыкальный инструмент -2 или Поэзия-2 для песен.

export const MusicalComposition = skillFabric({ skillSettings });
