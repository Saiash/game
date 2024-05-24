import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'blowPipe',
  ranged: {
    relativeSkill: 'blowpipe',
    aim: 1,
    range: { maxRange: 4, strBased: true },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 0,
    reloadTime: 2,
    ammoClip: { maxAmmo: 1, type: 'niddle' },
    ownStr: 13, // при 13 базовый урон thrust = 1к
    damageSets: [
      {
        dmgMod: -3,
        damageType: 'pi-',
        attackType: 'thrust',
      },
    ],
  },
  cost: 30,
  weight: 1,
  strRequired: 2,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BlowPipe = weaponFabric(weaponSettings);
