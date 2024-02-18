import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'currentAffairs',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { research: -4 },
};

export const CurrentAffairs = skillFabric(skillSettings);
