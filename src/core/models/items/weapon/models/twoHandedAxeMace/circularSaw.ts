import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'circularSaw',
  melee: {
    relativeSkill: 'twoHandedAxeMace',
    damageSets: [
      {
        dmgMod: 4,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  twoHanded: true,
  cost: 150,
  weight: 13,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const CircularSaw = weaponFabric(weaponSettings);
