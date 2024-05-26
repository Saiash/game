import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'musket',
  ranged: {
    relativeSkill: 'rifle',
    aim: 4,
    range: { halfRange: 700, maxRange: 2100, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 3,
    reloadTime: 15,
    ammoClip: { maxAmmo: 1, type: '0.57' },
    damageSets: [
      {
        dmgMod: 16,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 150,
  weight: 8.5,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Musket = weaponFabric(weaponSettings);
