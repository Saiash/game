import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'symbolDrawing',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const SymbolDrawing = skillFabric({ skillSettings });
