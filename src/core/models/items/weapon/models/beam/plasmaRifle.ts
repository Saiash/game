import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 11,
  code: 'plasmaRifle',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 12,
    range: { halfRange: 700, maxRange: 2100, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 50, type: 'batterym' },
    damageSets: [
      {
        dmgMod: 24,
        damageType: 'burn',
        armorDelimiter: 5,
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 2,
  cost: 18000,
  weight: 10,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const PlasmaRifle = weaponFabric(weaponSettings);
