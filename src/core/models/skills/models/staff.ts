import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'staff',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { spear: -2, polearm: -4 },
};

export const Staff = skillFabric({ skillSettings });
