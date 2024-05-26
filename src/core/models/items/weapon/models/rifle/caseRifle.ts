import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'caseRifle',
  ranged: {
    relativeSkill: 'rifle',
    aim: 3,
    range: { halfRange: 600, maxRange: 2000, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -6,
    recoil: 3,
    reloadTime: 4,
    ammoClip: { maxAmmo: 1, type: '0.57' },
    damageSets: [
      {
        dmgMod: 20,
        damageType: 'pi+',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 3,
  cost: 200,
  weight: 6,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const CaseRifle = weaponFabric(weaponSettings);
