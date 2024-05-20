import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'throwingAxe',
  melee: {
    relativeSkill: 'axeMace',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  throw: {
    relativeSkill: 'thrownWeapon',
    bulk: 3,
    aim: 2,
    range: { halfRange: 1, maxRange: 1.5, strBased: true },
    damageSets: [
      {
        dmgMod: 2,
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
  },

  techLevel: 0,
  cost: 60,
  weight: 4,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ThrowingAxe = weaponFabric(weaponSettings);
