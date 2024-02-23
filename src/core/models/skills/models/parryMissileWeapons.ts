import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'parryMissileWeapons',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const ParryMissileWeapons = skillFabric({ skillSettings });
