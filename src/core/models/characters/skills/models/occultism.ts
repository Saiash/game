import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'occultism',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Occultism = skillFabric({ skillSettings });
