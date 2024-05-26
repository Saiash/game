import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 7,
  code: 'fragGrenade',
  explosion: {
    relativeSkill: 'throwing',
    fuseTime: 4,
    fragmentDmg: 12,
    damageSets: [
      {
        dmgMod: 32,
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

export const FragGrenade = weaponFabric(weaponSettings);
