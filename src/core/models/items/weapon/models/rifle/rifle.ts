import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'rifle',
  ranged: {
    relativeSkill: 'rifle',
    aim: 5,
    range: { halfRange: 1000, maxRange: 4200, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -5,
    recoil: 4,
    reloadTime: 3,
    ammoClip: { maxAmmo: 6, type: '7.62' },
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
  cost: 350,
  weight: 8.9,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Rifle = weaponFabric(weaponSettings);
