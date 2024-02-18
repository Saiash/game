import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'makeup',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 1800,
  cultureBased: false,
  relativeSkills: { disguise: -2 },
};

export const Makeup = skillFabric(skillSettings);
