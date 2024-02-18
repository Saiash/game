import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'photography',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { electronicOperations: -5 },
};

export const Photography = skillFabric(skillSettings);
