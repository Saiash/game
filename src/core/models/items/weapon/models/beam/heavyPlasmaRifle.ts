import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 11,
  code: 'heavyPlasmaRifle',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 14,
    range: { halfRange: 900, maxRange: 2700, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 90, type: 'batteryl' },
    damageSets: [
      {
        dmgMod: 32,
        damageType: 'burn',
        armorDelimiter: 5,
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 23000,
  weight: 20,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const HeavyPlasmaRifle = weaponFabric(weaponSettings);
