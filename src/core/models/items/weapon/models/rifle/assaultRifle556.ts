import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'assaultRifle556',
  ranged: {
    relativeSkill: 'rifle',
    aim: 5,
    range: { halfRange: 500, maxRange: 3500, strBased: false },
    rateOfFire: { rof: 12, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 31, type: '5.56' },
    damageSets: [
      {
        dmgMod: 20,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 2,
  cost: 800,
  weight: 9,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const AssaultRifle556 = weaponFabric(weaponSettings);
