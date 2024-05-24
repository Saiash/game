import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'slingSpoon',
  ranged: {
    relativeSkill: 'sling',
    aim: 1,
    range: { halfRange: 10, maxRange: 15, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'bullet' },
    damageSets: [
      {
        dmgMod: 1,
        damageType: 'pi',
        attackType: 'swing',
      },
    ],
  },
  cost: 20,
  weight: 2,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SlingSpoon = weaponFabric(weaponSettings);
