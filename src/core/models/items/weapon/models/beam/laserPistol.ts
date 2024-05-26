import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 10,
  code: 'laserPistol',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 6,
    range: { halfRange: 250, maxRange: 750, strBased: false },
    rateOfFire: { rof: 10, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 400, type: 'batteryl' },
    damageSets: [
      {
        dmgMod: 12,
        damageType: 'burn',
        armorDelimiter: 2,
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: false,
  legalityClass: 3,
  cost: 2800,
  weight: 3.3,
  strRequired: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LaserPistol = weaponFabric(weaponSettings);
