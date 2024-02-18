import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'thrownWeapon',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { throwing: -2 },
};

export const ThrownWeapon = skillFabric(skillSettings);
