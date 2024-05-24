import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'javelin',
  melee: {
    relativeSkill: 'spear',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1],
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
    bulk: 4,
    aim: 3,
    range: { halfRange: 1.5, maxRange: 2.5, strBased: true },
    damageSets: [
      {
        dmgMod: 1,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  cost: 30,
  weight: 2,
  strRequired: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Javelin = weaponFabric(weaponSettings);
