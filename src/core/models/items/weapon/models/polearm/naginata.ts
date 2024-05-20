import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 2,
  code: 'naginata',
  melee: {
    relativeSkill: 'polearm',
    damageSets: [
      {
        dmgMod: 2,
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
  cost: 100,
  weight: 6,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Naginata = weaponFabric(weaponSettings);
