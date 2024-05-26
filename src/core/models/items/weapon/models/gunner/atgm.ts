import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'atgm',
  ranged: {
    relativeSkill: 'gunner',
    aim: 3,
    range: { halfRange: 200, maxRange: 2000, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -10,
    recoil: 1,
    reloadTime: 20,
    ammoClip: { maxAmmo: 1, type: 'atgmRocket' },
    damageSets: [
      {
        dmgMod: 240,
        armorDelimiter: 10,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 20000,
  weight: 37,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Atgm = weaponFabric(weaponSettings);
