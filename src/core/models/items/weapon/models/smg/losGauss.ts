import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 10,
  code: 'losGauss',
  ranged: {
    relativeSkill: 'smg',
    aim: 7,
    range: { halfRange: 700, maxRange: 2900, strBased: false },
    rateOfFire: { rof: 16, shots: 1, type: 'semiauto' },
    bulk: -3,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 80, type: '0.45' },
    damageSets: [
      {
        dmgMod: 16,
        armorDelimiter: 2,
        damageType: 'pi-',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 2,
  cost: 3600,
  weight: 4.6,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const losGauss = weaponFabric(weaponSettings);
