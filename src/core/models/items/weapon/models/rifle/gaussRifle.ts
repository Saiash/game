import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 10,
  code: 'gaussRifle',
  ranged: {
    relativeSkill: 'rifle',
    aim: 9,
    range: { halfRange: 1200, maxRange: 4800, strBased: false },
    rateOfFire: { rof: 12, shots: 1, type: 'semiauto' },
    bulk: -4,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 60, type: '4' },
    damageSets: [
      {
        dmgMod: 26,
        armorDelimiter: 3,
        damageType: 'pi-',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 2,
  cost: 7100,
  weight: 8.5,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const GaussRifle = weaponFabric(weaponSettings);
