import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'sling',
  ranged: {
    relativeSkill: 'sling',
    aim: 0,
    range: { halfRange: 6, maxRange: 10, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'bullet' },
    damageSets: [
      {
        dmgMod: 0,
        damageType: 'pi',
        attackType: 'swing',
      },
    ],
  },
  cost: 20,
  weight: 0.5,
  strRequired: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Sling = weaponFabric(weaponSettings);
