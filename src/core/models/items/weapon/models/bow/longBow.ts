import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'longBow',
  ranged: {
    relativeSkill: 'bow',
    aim: 3,
    range: { halfRange: 15, maxRange: 20, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -8,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'arrow' },
    damageSets: [
      {
        dmgMod: 2,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 200,
  weight: 3,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LongBow = weaponFabric(weaponSettings);
