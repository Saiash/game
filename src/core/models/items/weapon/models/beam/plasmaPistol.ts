import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 11,
  code: 'plasmaPistol',
  ranged: {
    relativeSkill: 'beamWeapons',
    aim: 5,
    range: { halfRange: 300, maxRange: 900, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 200, type: 'batteryl' },
    damageSets: [
      {
        dmgMod: 12,
        damageType: 'burn',
        armorDelimiter: 5,
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: false,
  legalityClass: 3,
  cost: 2200,
  weight: 1.6,
  strRequired: 4,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const PlasmaPistol = weaponFabric(weaponSettings);
