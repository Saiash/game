import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'astronomy',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Astronomy = skillFabric({ skillSettings });
