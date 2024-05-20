import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'hatchet',
  melee: {
    relativeSkill: 'axeMace',
    damageSets: [
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  throw: {
    relativeSkill: 'thrownWeapon',
    bulk: 2,
    aim: 1,
    range: { halfRange: 1.5, maxRange: 2.5, strBased: true },
    damageSets: [
      {
        dmgMod: 0,
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
  },

  techLevel: 0,
  cost: 40,
  weight: 2,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Hatchet = weaponFabric(weaponSettings);
