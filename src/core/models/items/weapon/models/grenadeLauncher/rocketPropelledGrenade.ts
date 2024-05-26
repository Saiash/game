import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 8,
  code: 'rocketPropelledGrenade',
  ranged: {
    relativeSkill: 'grenadeLauncher',
    aim: 3,
    range: { halfRange: 330, maxRange: 2300, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -5,
    recoil: 1,
    reloadTime: 5,
    ammoClip: { maxAmmo: 1, type: 'rocket' },
    damageSets: [
      {
        dmgMod: 144,
        armorDelimiter: 10,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 750,
  weight: 14.7,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const RocketPropelledGrenade = weaponFabric(weaponSettings);
