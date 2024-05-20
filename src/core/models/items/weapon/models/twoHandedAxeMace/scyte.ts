import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'scyte',
  melee: {
    relativeSkill: 'twoHandedAxeMace',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'imp',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  twoHanded: true,
  cost: 15,
  weight: 5,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Scyte = weaponFabric(weaponSettings);
