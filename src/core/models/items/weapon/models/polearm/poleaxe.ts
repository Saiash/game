import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'poleaxe',
  melee: {
    relativeSkill: 'polearm',
    damageSets: [
      {
        dmgMod: 4,
        reach: [2, 3],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 4,
        reach: [2, 3],
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
  cost: 120,
  weight: 10,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Poleaxe = weaponFabric(weaponSettings);
