import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'bigKnife',
  melee: {
    relativeSkill: 'knife',
    damageSets: [
      {
        dmgMod: -2,
        reach: [0, 1],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 0,
        reach: [0],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: -1,
    },
  },
  throw: {
    relativeSkill: 'thrownWeapon',
    bulk: 2,
    aim: 0,
    range: { halfRange: 0.8, maxRange: 1.5, strBased: true },
    damageSets: [
      {
        dmgMod: 0,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  cost: 40,
  weight: 1,
  strRequired: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BigKnife = weaponFabric(weaponSettings);
