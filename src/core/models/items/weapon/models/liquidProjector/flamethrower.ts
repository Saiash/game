import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'flamethrower',
  ranged: {
    relativeSkill: 'liquidProjector',
    aim: 0,
    range: { maxRange: 50, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -8,
    recoil: 0,
    reloadTime: 5,
    ammoClip: { maxAmmo: 10, type: 'fuel' },
    damageSets: [
      {
        dmgMod: 12,
        damageType: 'burn',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 1,
  cost: 1800,
  weight: 70,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Flamethrower = weaponFabric(weaponSettings);
