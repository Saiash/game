import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 8,
  code: 'los46',
  ranged: {
    relativeSkill: 'smg',
    aim: 3,
    range: { halfRange: 200, maxRange: 2000, strBased: false },
    rateOfFire: { rof: 15, shots: 1, type: 'semiauto' },
    bulk: -3,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 21, type: '0.45' },
    damageSets: [
      {
        dmgMod: 17,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 2,
  cost: 800,
  weight: 3.9,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Los46 = weaponFabric(weaponSettings);
