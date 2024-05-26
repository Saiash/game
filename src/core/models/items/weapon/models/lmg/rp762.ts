import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'rp762',
  ranged: {
    relativeSkill: 'lmg',
    aim: 5,
    range: { halfRange: 1000, maxRange: 4200, strBased: false },
    rateOfFire: { rof: 15, shots: 1, type: 'fullauto' },
    bulk: -6,
    recoil: 2,
    reloadTime: 5,
    ammoClip: { maxAmmo: 100, type: '7.62' },
    damageSets: [
      {
        dmgMod: 28,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 6600,
  weight: 30,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Rp762 = weaponFabric(weaponSettings);
