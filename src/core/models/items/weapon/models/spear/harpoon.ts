import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 2,
  code: 'harpoon',
  melee: {
    relativeSkill: 'spear',
    damageSets: [
      {
        dmgMod: 4,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  throw: {
    relativeSkill: 'thrownWeapon',
    bulk: 6,
    aim: 2,
    range: { halfRange: 1, maxRange: 1.5, strBased: true },
    damageSets: [
      {
        dmgMod: 5,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  cost: 60,
  weight: 6,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Harpoon = weaponFabric(weaponSettings);

//TODO: верховое
