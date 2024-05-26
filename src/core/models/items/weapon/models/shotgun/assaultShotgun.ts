import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'assaultShotgun',
  ranged: {
    relativeSkill: 'shotgun',
    aim: 3,
    range: { halfRange: 50, maxRange: 125, strBased: false },
    rateOfFire: { rof: 3, shots: 9, type: 'semiauto' },
    bulk: -5,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 7, type: '12G' },
    damageSets: [
      {
        dmgMod: 5,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 950,
  weight: 8.4,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const AssaultShotgun = weaponFabric(weaponSettings);
