import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'hiddenPistol',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { halfRange: 150, maxRange: 1850, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -1,
    recoil: 3,
    reloadTime: 3,
    ammoClip: { maxAmmo: 6, type: '0.38' },
    damageSets: [
      {
        dmgMod: 8,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  cost: 300,
  weight: 1.3,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const HiddenPistol = weaponFabric(weaponSettings);
