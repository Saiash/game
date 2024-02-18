import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'dropping',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { throwing: -4 },
};

// Мета- ние-4.

export const Dropping = skillFabric(skillSettings);
