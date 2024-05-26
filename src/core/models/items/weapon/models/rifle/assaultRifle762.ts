import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'assaultRifle762',
  ranged: {
    relativeSkill: 'rifle',
    aim: 5,
    range: { halfRange: 1000, maxRange: 4200, strBased: false },
    rateOfFire: { rof: 11, shots: 1, type: 'semiauto' },
    bulk: -5,
    recoil: 3,
    reloadTime: 3,
    ammoClip: { maxAmmo: 21, type: '7.62' },
    damageSets: [
      {
        dmgMod: 28,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 2,
  cost: 900,
  weight: 11,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const AssaultRifle762 = weaponFabric(weaponSettings);
