import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 8,
  code: 'ap4',
  ranged: {
    relativeSkill: 'pistol',
    aim: 2,
    range: { halfRange: 230, maxRange: 2500, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 16, type: '0.4' },
    damageSets: [
      {
        dmgMod: 8,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 640,
  weight: 2.1,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Ap4 = weaponFabric(weaponSettings);
