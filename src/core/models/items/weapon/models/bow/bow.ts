import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'bow',
  ranged: {
    relativeSkill: 'bow',
    aim: 2,
    range: { halfRange: 15, maxRange: 20, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -7,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'arrow' },
    damageSets: [
      {
        dmgMod: 1,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 100,
  weight: 2,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Bow = weaponFabric(weaponSettings);
