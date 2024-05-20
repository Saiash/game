import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'club',
  melee: {
    relativeSkill: 'brawling',
    damageSets: [
      {
        dmgMod: 0,
        reach: [0],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  techLevel: 1,
  cost: 20,
  weight: 1,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Club = weaponFabric(weaponSettings);
