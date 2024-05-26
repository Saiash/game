import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 9,
  code: 'electrolaserRifle',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 9,
    range: { halfRange: 160, maxRange: 470, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 360, type: 'batterym' },
    damageSets: [
      {
        dmgMod: 4,
        damageType: 'burn',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 3900,
  weight: 3.7,
  strRequired: 4,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ElectrolaserRifle = weaponFabric(weaponSettings);
