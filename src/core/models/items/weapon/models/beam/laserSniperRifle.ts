import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 9,
  code: 'laserSniperRifle',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 14,
    range: { halfRange: 1100, maxRange: 3300, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -8,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 75, type: 'batteryl' },
    damageSets: [
      {
        dmgMod: 20,
        damageType: 'burn',
        armorDelimiter: 2,
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 2,
  cost: 20000,
  weight: 20,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LaserSniperRifle = weaponFabric(weaponSettings);
