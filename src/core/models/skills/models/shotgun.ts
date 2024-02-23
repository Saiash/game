import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'shotgun',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    grenadeLauncher: -2,
    gyroc: -2,
    smg: -2,
    rifle: -2,
    pistol: -2,
    lmg: -2,
  },
};

export const Shotgun = skillFabric({ skillSettings });
