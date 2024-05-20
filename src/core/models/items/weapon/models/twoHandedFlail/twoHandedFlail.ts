import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'twoHandedFlail',
  melee: {
    relativeSkill: 'twoHandedFlail',
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
  cost: 100,
  weight: 8,
  strRequired: 13,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const TwoHandedFlail = weaponFabric(weaponSettings);

//парирование цепов дает -4, блокирование -2
