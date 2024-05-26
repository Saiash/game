import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'ap45',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { halfRange: 120, maxRange: 1300, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 3,
    reloadTime: 3,
    ammoClip: { maxAmmo: 8, type: '0.45' },
    damageSets: [
      {
        dmgMod: 8,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 300,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Ap45 = weaponFabric(weaponSettings);
