import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'groupLmg',
  ranged: {
    relativeSkill: 'lmg',
    aim: 5,
    range: { halfRange: 800, maxRange: 3500, strBased: false },
    rateOfFire: { rof: 12, shots: 1, type: 'fullauto' },
    bulk: -6,
    recoil: 2,
    reloadTime: 5,
    ammoClip: { maxAmmo: 200, type: '7.62' },
    damageSets: [
      {
        dmgMod: 21,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 4800,
  weight: 24,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const GroupLmg = weaponFabric(weaponSettings);
