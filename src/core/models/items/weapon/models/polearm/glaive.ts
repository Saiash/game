import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'glaive',
  melee: {
    relativeSkill: 'polearm',
    damageSets: [
      {
        dmgMod: 3,
        reach: [2, 3],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 3,
        reach: [1, 2, 3],
        damageType: 'imp',
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
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Glaive = weaponFabric(weaponSettings);
