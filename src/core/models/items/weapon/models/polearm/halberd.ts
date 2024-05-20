import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'halberd',
  melee: {
    relativeSkill: 'polearm',
    damageSets: [
      {
        dmgMod: 5,
        reach: [2, 3],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 4,
        reach: [2, 3],
        damageType: 'imp',
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
  cost: 150,
  weight: 12,
  strRequired: 13,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Halberd = weaponFabric(weaponSettings);
