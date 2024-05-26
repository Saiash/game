import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'revolver36',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { halfRange: 120, maxRange: 1300, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 6, type: '0.36' },
    damageSets: [
      {
        dmgMod: 7,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 150,
  weight: 2.5,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Revolver36 = weaponFabric(weaponSettings);
