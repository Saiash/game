import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'garrote',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Garrote = skillFabric({ skillSettings });
