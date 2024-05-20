import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'stabbingTwoHandedSword',
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
        dmgMod: 3,
        reach: [2],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  twoHanded: true,
  cost: 900,
  weight: 7,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const StabbingTwoHandedSword = weaponFabric(weaponSettings);
