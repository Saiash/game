import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'archaeology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Archaeology = skillFabric({ skillSettings });
