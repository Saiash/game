import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 11,
  code: 'monowireWhip',
  melee: {
    relativeSkill: 'whip',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1, 2, 3, 4, 5, 6, 7],
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: -2,
      options: 'unbalanced',
    },
  },
  cost: 900,
  weight: 0.5,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const MonowireWhip = weaponFabric(weaponSettings);
