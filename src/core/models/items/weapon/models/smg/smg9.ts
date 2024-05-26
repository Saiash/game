import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'smg9',
  ranged: {
    relativeSkill: 'smg',
    aim: 4,
    range: { halfRange: 160, maxRange: 1900, strBased: false },
    rateOfFire: { rof: 13, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 31, type: '0.9' },
    damageSets: [
      {
        dmgMod: 11,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 2,
  cost: 1200,
  weight: 7.5,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Smg9 = weaponFabric(weaponSettings);
