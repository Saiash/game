import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'mace',
  melee: {
    relativeSkill: 'axeMace',
    damageSets: [
      {
        dmgMod: 3,
        reach: [1],
        damageType: 'cr',
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
    bulk: 4,
    aim: 1,
    range: { halfRange: 0.5, maxRange: 1, strBased: true },
    damageSets: [
      {
        dmgMod: 3,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },

  techLevel: 2,
  cost: 50,
  weight: 5,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Mace = weaponFabric(weaponSettings);
