import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 8,
  code: 'sniperRifle',
  ranged: {
    relativeSkill: 'rifle',
    aim: 9,
    range: { halfRange: 1500, maxRange: 5500, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 4,
    reloadTime: 3,
    ammoClip: { maxAmmo: 5, type: '0.338' },
    damageSets: [
      {
        dmgMod: 37,
        damageType: 'pi',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 5600,
  weight: 17.5,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SniperRifle = weaponFabric(weaponSettings);
