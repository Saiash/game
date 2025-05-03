import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bolas',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Bolas = skillFabric({ skillSettings });
