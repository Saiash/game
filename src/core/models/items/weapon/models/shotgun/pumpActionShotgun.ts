import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'pumpActionShotgun',
  ranged: {
    relativeSkill: 'shotgun',
    aim: 3,
    range: { halfRange: 50, maxRange: 125, strBased: false },
    rateOfFire: { rof: 2, shots: 9, type: 'semiauto' },
    bulk: -5,
    recoil: 1,
    reloadTime: 3,
    ammoClip: { maxAmmo: 5, type: '12G' },
    damageSets: [
      {
        dmgMod: 5,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 4,
  cost: 240,
  weight: 8,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const PumpActionShotgun = weaponFabric(weaponSettings);
