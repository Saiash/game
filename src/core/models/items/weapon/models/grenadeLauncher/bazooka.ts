import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'bazooka',
  ranged: {
    relativeSkill: 'grenadeLauncher',
    aim: 3,
    range: { halfRange: 100, maxRange: 650, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 1,
    reloadTime: 4,
    ammoClip: { maxAmmo: 1, type: 'grenade' },
    damageSets: [
      {
        dmgMod: 48,
        armorDelimiter: 10,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 1000,
  weight: 16.7,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Bazooka = weaponFabric(weaponSettings);
