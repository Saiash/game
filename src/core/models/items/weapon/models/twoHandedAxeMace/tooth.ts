import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'tooth',
  melee: {
    relativeSkill: 'twoHandedAxeMace',
    damageSets: [
      {
        dmgMod: 3,
        reach: [1, 2],
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
  cost: 100,
  weight: 7,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Tooth = weaponFabric(weaponSettings);
