import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'whip',
  melee: {
    relativeSkill: 'whip',
    damageSets: [
      {
        dmgMod: -2,
        reach: [1, 2, 3, 4, 5, 6, 7],
        armorDelimiter: 0.5,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: -2,
      options: 'unbalanced',
    },
  },
  twoHanded: true,
  cost: 800,
  weight: 7,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Whip = weaponFabric(weaponSettings);
