import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'escape',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Escape = skillFabric({ skillSettings });
