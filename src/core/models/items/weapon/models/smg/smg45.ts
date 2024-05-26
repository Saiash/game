import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'smg45',
  ranged: {
    relativeSkill: 'smg',
    aim: 3,
    range: { halfRange: 190, maxRange: 1750, strBased: false },
    rateOfFire: { rof: 13, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 3,
    reloadTime: 5,
    ammoClip: { maxAmmo: 51, type: '0.45' },
    damageSets: [
      {
        dmgMod: 9,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 2,
  cost: 2200,
  weight: 15.7,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Smg45 = weaponFabric(weaponSettings);
