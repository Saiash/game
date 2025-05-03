import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'rifle',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    grenadeLauncher: -2,
    gyroc: -2,
    smg: -2,
    shotgun: -2,
    pistol: -2,
    lmg: -2,
  },
};

export const Rifle = skillFabric({ skillSettings });
