import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'pharmacy',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

// Биология-5, Знание трав-5, Натуралист-5 Химия-5 или Врачебное дело-5.

export const Pharmacy = skillFabric(skillSettings);
