import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'grenade',
  explosion: {
    relativeSkill: 'throwing',
    fuseTime: 4,
    fragmentDmg: 8,
    damageSets: [
      {
        dmgMod: 16,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },
  cost: 10,
  legalityClass: 2,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Grenade = weaponFabric(weaponSettings);
