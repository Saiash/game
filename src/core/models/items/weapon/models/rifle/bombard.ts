import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'bombard',
  ranged: {
    relativeSkill: 'rifle',
    aim: 0,
    range: { halfRange: 100, maxRange: 600, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 3,
    reloadTime: 60,
    ammoClip: { maxAmmo: 1, type: '0.9' },
    damageSets: [
      {
        dmgMod: 8,
        damageType: 'pi++',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 300,
  weight: 15,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Bombard = weaponFabric(weaponSettings);
