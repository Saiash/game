import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'blunderbuss',
  ranged: {
    relativeSkill: 'shotgun',
    aim: 1,
    range: { halfRange: 15, maxRange: 100, strBased: false },
    rateOfFire: { rof: 1, shots: 9, type: 'semiauto' },
    bulk: -5,
    recoil: 1,
    reloadTime: 15,
    ammoClip: { maxAmmo: 1, type: '8G' },
    damageSets: [
      {
        dmgMod: 4,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 4,
  cost: 150,
  weight: 12,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Blunderbuss = weaponFabric(weaponSettings);
