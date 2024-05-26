import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'revolver44',
  ranged: {
    relativeSkill: 'pistol',
    aim: 2,
    range: { halfRange: 185, maxRange: 2000, strBased: false },
    rateOfFire: { rof: 3, shots: 1, type: 'semiauto' },
    bulk: -3,
    recoil: 4,
    reloadTime: 3,
    ammoClip: { maxAmmo: 6, type: '0.44' },
    damageSets: [
      {
        dmgMod: 12,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  cost: 900,
  weight: 3.25,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Revolver44 = weaponFabric(weaponSettings);
