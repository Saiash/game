import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'navigation',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const Navigation = skillFabric(skillSettings);
