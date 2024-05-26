import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'lmg50',
  ranged: {
    relativeSkill: 'lmg',
    aim: 6,
    range: { halfRange: 1800, maxRange: 7400, strBased: false },
    rateOfFire: { rof: 8, shots: 1, type: 'fullauto' },
    bulk: -8,
    recoil: 2,
    reloadTime: 5,
    ammoClip: { maxAmmo: 100, type: '0.5' },
    damageSets: [
      {
        dmgMod: 53,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 14000,
  weight: 116,
  strRequired: 20,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Lmg50 = weaponFabric(weaponSettings);
