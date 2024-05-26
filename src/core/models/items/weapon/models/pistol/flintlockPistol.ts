import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'flintlockPistol',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { halfRange: 75, maxRange: 450, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -3,
    recoil: 2,
    reloadTime: 20,
    ammoClip: { maxAmmo: 1, type: '0.51' },
    damageSets: [
      {
        dmgMod: 7,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 200,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const FlintlockPistol = weaponFabric(weaponSettings);
