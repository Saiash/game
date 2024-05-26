import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'derringer',
  ranged: {
    relativeSkill: 'pistol',
    aim: 1,
    range: { halfRange: 80, maxRange: 650, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -1,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 2, type: '0.41' },
    damageSets: [
      {
        dmgMod: 4,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  legalityClass: 3,
  cost: 100,
  weight: 0.5,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Derringer = weaponFabric(weaponSettings);
