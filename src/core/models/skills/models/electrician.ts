import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'electrician',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { engineer: -3 },
};

export const Electrician = skillFabric(skillSettings);
