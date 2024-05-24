import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'oneHandCrossbow',
  ranged: {
    relativeSkill: 'crossbow',
    aim: 1,
    range: { halfRange: 15, maxRange: 20, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 0,
    reloadTime: 4,
    ammoClip: { maxAmmo: 1, type: 'bolt' },
    damageSets: [
      {
        dmgMod: 2,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
  },
  cost: 150,
  weight: 4,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const OneHandCrossbow = weaponFabric(weaponSettings);
