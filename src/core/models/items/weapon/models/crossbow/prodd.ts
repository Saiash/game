import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'prodd',
  ranged: {
    relativeSkill: 'crossbow',
    aim: 2,
    range: { halfRange: 20, maxRange: 25, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'bolt' },
    damageSets: [
      {
        dmgMod: 4,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 150,
  weight: 6,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Prodd = weaponFabric(weaponSettings);
