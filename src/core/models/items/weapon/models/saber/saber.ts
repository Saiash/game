import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'saber',
  melee: {
    relativeSkill: 'saber',
    damageSets: [
      {
        dmgMod: -1,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'fencing',
    },
  },
  cost: 700,
  weight: 2,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Saber = weaponFabric(weaponSettings);
