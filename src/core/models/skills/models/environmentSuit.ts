import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'environmentSuit',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const EnvironmentSuit = skillFabric(skillSettings);
