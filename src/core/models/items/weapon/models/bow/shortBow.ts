import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'shortBow',
  ranged: {
    relativeSkill: 'bow',
    aim: 1,
    range: { halfRange: 10, maxRange: 15, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'arrow' },
    damageSets: [
      {
        dmgMod: 0,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 50,
  weight: 2,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ShortBow = weaponFabric(weaponSettings);
