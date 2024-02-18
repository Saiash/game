import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'staff',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// Копье-2, Древко- вое оружие-4.

export const Staff = skillFabric(skillSettings);
