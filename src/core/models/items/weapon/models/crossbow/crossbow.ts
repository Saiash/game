import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'crossbow',
  ranged: {
    relativeSkill: 'crossbow',
    aim: 4,
    range: { halfRange: 20, maxRange: 25, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 0,
    reloadTime: 4,
    ammoClip: { maxAmmo: 1, type: 'bolt' },
    damageSets: [
      {
        dmgMod: 4,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 150,
  weight: 2,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Crossbow = weaponFabric(weaponSettings);
