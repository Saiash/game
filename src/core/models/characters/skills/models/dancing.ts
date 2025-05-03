import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'dancing',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: true,
  relativeSkills: {},
};

export const Dancing = skillFabric({ skillSettings });
