import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 9,
  code: 'gyroPistol',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { maxRange: 1900, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 4, type: '1.5' },
    damageSets: [
      {
        dmgMod: 14,
        damageType: 'pi++',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 200,
  weight: 1,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const GyroPistol = weaponFabric(weaponSettings);
