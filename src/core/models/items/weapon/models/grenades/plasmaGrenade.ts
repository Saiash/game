import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 9,
  code: 'plasmaGrenade',
  explosion: {
    relativeSkill: 'throwing',
    fuseTime: 2,
    damageSets: [
      {
        dmgMod: 96,
        damageType: 'burn',
        attackType: 'swing',
      },
    ],
  },
  cost: 100,
  legalityClass: 1,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const PlasmaGrenade = weaponFabric(weaponSettings);
