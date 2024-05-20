import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'twoHandedSword',
  melee: {
    relativeSkill: 'twoHandedSword',
    damageSets: [
      {
        dmgMod: 3,
        reach: [1, 2],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 2,
        reach: [2],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  twoHanded: true,
  cost: 800,
  weight: 7,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const TwoHandedSword = weaponFabric(weaponSettings);
