import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'leverCarabiner',
  ranged: {
    relativeSkill: 'rifle',
    aim: 4,
    range: { halfRange: 450, maxRange: 3000, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 7, type: '0.3' },
    damageSets: [
      {
        dmgMod: 20,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 300,
  weight: 7,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LeverCarabiner = weaponFabric(weaponSettings);
