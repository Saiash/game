import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'flintlockMusket',
  ranged: {
    relativeSkill: 'rifle',
    aim: 2,
    range: { halfRange: 100, maxRange: 1500, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 3,
    reloadTime: 15,
    ammoClip: { maxAmmo: 1, type: '0.75' },
    damageSets: [
      {
        dmgMod: 16,
        damageType: 'pi++',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 4,
  cost: 200,
  weight: 13,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const FlintlockMusket = weaponFabric(weaponSettings);
