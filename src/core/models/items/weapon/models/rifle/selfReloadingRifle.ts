import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'selfReloadingRifle',
  ranged: {
    relativeSkill: 'rifle',
    aim: 5,
    range: { halfRange: 1000, maxRange: 4200, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -5,
    recoil: 3,
    reloadTime: 3,
    ammoClip: { maxAmmo: 8, type: '7.62' },
    damageSets: [
      {
        dmgMod: 28,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 600,
  weight: 10,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SelfReloadingRifle = weaponFabric(weaponSettings);
