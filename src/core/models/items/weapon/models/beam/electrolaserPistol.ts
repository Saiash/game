import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 9,
  code: 'electrolaserPistol',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 4,
    range: { halfRange: 40, maxRange: 80, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 180, type: 'batteryl' },
    damageSets: [
      {
        dmgMod: 4,
        damageType: 'burn',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: false,
  legalityClass: 4,
  cost: 1800,
  weight: 2.2,
  strRequired: 4,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ElectrolaserPistol = weaponFabric(weaponSettings);
