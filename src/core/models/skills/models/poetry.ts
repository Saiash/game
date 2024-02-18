import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'poetry',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { writing: -5 },
};

export const Poetry = skillFabric(skillSettings);
