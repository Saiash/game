import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'smallMace',
  melee: {
    relativeSkill: 'axeMace',
    damageSets: [
      {
        dmgMod: 2,
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
    bulk: 3,
    aim: 1,
    range: { halfRange: 1, maxRange: 1.5, strBased: true },
    damageSets: [
      {
        dmgMod: 2,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },

  techLevel: 3,
  cost: 35,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SmallMace = weaponFabric(weaponSettings);
