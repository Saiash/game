import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 5,
  code: 'blackGunPowederGrenade',
  explosion: {
    relativeSkill: 'throwing',
    fragmentDmg: 4,
    fuseTime: 5,
    damageSets: [
      {
        dmgMod: 12,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },
  cost: 5,
  legalityClass: 2,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BlackGunPowederGrenade = weaponFabric(weaponSettings);
