import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'lmg',
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
    pistol: -2,
  },
};

export const LMG = skillFabric(skillSettings);
