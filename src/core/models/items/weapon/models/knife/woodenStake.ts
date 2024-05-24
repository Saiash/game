import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'woodenStake',
  melee: {
    relativeSkill: 'knife',
    damageSets: [
      {
        dmgMod: 0,
        reach: [0],
        armorDelimiter: 0.5,
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
    bulk: -2,
    aim: 0,
    range: { halfRange: 0.5, maxRange: 1, strBased: true },
    damageSets: [
      {
        dmgMod: 0,
        armorDelimiter: 0.5,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  cost: 4,
  weight: 0.5,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const WoodenStake = weaponFabric(weaponSettings);
