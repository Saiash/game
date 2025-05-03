import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'geology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { geography: -4, prospecting: -5 },
};

export const Geology = skillFabric({ skillSettings });
