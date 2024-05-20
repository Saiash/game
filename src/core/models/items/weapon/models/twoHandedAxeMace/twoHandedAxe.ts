import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'twoHandedAxe',
  melee: {
    relativeSkill: 'twoHandedAxeMace',
    damageSets: [
      {
        dmgMod: 3,
        reach: [1, 2],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 2,
        reach: [1, 2],
        damageType: 'cr',
        attackType: 'thrust',
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
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const TwoHandedAxe = weaponFabric(weaponSettings);
