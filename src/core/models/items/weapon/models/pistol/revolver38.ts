import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'revolver38',
  ranged: {
    relativeSkill: 'pistol',
    aim: 2,
    range: { halfRange: 150, maxRange: 1850, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -2,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 6, type: '0.38' },
    damageSets: [
      {
        dmgMod: 7,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  cost: 400,
  weight: 2,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Revolver38 = weaponFabric(weaponSettings);
