import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 9,
  code: 'ap9',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { halfRange: 150, maxRange: 1900, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 19, type: '0.9' },
    damageSets: [
      {
        dmgMod: 10,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 800,
  weight: 2,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Ap9 = weaponFabric(weaponSettings);
