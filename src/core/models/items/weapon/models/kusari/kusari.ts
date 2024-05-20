import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'kusari',
  melee: {
    relativeSkill: 'kusari',
    damageSets: [
      {
        dmgMod: -1,
        reach: [1, 2, 3, 4],
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: -2,
      options: 'unbalanced',
    },
  },
  cost: 70,
  weight: 5,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Kusari = weaponFabric(weaponSettings);
