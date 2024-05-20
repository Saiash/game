import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'maul',
  melee: {
    relativeSkill: 'twoHandedAxeMace',
    damageSets: [
      {
        dmgMod: 4,
        reach: [1, 2],
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  twoHanded: true,
  cost: 80,
  weight: 12,
  strRequired: 13,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Maul = weaponFabric(weaponSettings);
