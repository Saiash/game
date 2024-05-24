import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'compositeBow',
  ranged: {
    relativeSkill: 'bow',
    aim: 3,
    range: { halfRange: 20, maxRange: 25, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -7,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'arrow' },
    damageSets: [
      {
        dmgMod: 3,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 900,
  weight: 4,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const CompositeBow = weaponFabric(weaponSettings);
