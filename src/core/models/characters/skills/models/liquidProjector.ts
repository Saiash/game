import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'liquidProjector',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const LiquidProjector = skillFabric({ skillSettings });
