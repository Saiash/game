import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'spear',
  melee: {
    relativeSkill: 'spear',
    damageSets: [
      {
        dmgMod: 3,
        reach: [1, 2],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  throw: {
    relativeSkill: 'thrownWeapon',
    bulk: 6,
    aim: 2,
    range: { halfRange: 1, maxRange: 1.5, strBased: true },
    damageSets: [
      {
        dmgMod: 3,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 40,
  weight: 4,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Spear = weaponFabric(weaponSettings);
