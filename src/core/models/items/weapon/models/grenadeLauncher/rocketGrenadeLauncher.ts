import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'rocketGrenadeLauncher',
  ranged: {
    relativeSkill: 'grenadeLauncher',
    aim: 4,
    range: { halfRange: 300, maxRange: 1000, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 1,
    reloadTime: 5,
    ammoClip: { maxAmmo: 1, type: 'rocketGrenade' },
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
  cost: 800,
  weight: 21,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const RocketGrenadeLauncher = weaponFabric(weaponSettings);
