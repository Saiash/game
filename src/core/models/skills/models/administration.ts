import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'administration',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { merchant: -3 },
};

// также дать премию +2 к реакции при общении с чиновниками и

export const Administration = skillFabric(skillSettings);
