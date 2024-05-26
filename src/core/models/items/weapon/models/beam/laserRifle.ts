import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 10,
  code: 'laserRifle',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 14,
    range: { halfRange: 700, maxRange: 2100, strBased: false },
    rateOfFire: { rof: 10, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 150, type: 'batterym' },
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
  cost: 10000,
  weight: 10,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LaserRifle = weaponFabric(weaponSettings);
