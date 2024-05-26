import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 8,
  code: 'antiairMissile',
  ranged: {
    relativeSkill: 'gunner',
    aim: 7,
    range: { halfRange: 1000, maxRange: 8800, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -8,
    recoil: 1,
    reloadTime: 20,
    ammoClip: { maxAmmo: 1, type: 'aaRocket' },
    damageSets: [
      {
        dmgMod: 72,
        armorDelimiter: 10,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 38000,
  weight: 18,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const AntiairMissile = weaponFabric(weaponSettings);
