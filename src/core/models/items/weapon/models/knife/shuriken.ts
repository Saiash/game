import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'shuriken',
  melee: {
    relativeSkill: 'knife',
    damageSets: [
      {
        dmgMod: -1,
        reach: [0],
        damageType: 'cut',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: -1,
    },
  },
  throw: {
    relativeSkill: 'thrownWeapon',
    bulk: 0,
    aim: 1,
    range: { halfRange: 0.5, maxRange: 1, strBased: true },
    damageSets: [
      {
        dmgMod: -1,
        damageType: 'cut',
        attackType: 'thrust',
      },
    ],
  },
  cost: 3,
  weight: 0.5,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Shuriken = weaponFabric(weaponSettings);
