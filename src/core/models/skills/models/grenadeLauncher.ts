import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'grenadeLauncher',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    gyroc: -2,
    smg: -2,
    shotgun: -2,
    rifle: -2,
    pistol: -2,
    lmg: -2,
  },
};

export const GrenadeLauncher = skillFabric(skillSettings);
