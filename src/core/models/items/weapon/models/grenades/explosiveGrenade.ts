import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'explosiveGrenade',
  explosion: {
    relativeSkill: 'throwing',
    fuseTime: 4,
    damageSets: [
      {
        dmgMod: 40,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },
  cost: 40,
  legalityClass: 2,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ExplosiveGrenade = weaponFabric(weaponSettings);
