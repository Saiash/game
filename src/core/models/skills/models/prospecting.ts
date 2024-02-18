import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'prospecting',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { geology: -4 },
};

export const Prospecting = skillFabric(skillSettings);
