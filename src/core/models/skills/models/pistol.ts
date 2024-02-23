import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'pistol',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    grenadeLauncher: -2,
    gyroc: -2,
    smg: -2,
    shotgun: -2,
    rifle: -2,
    lmg: -2,
  },
};

export const Pistol = skillFabric({ skillSettings });
