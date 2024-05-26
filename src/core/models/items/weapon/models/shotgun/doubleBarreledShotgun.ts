import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'doubleBarreledShotgun',
  ranged: {
    relativeSkill: 'shotgun',
    aim: 3,
    range: { halfRange: 50, maxRange: 125, strBased: false },
    rateOfFire: { rof: 2, shots: 9, type: 'semiauto' },
    bulk: -5,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 2, type: '10G' },
    damageSets: [
      {
        dmgMod: 6,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 4,
  cost: 450,
  weight: 10,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const DoubleBarreledShotgun = weaponFabric(weaponSettings);
