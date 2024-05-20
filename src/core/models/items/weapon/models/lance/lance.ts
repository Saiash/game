import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 2,
  code: 'lance',
  melee: {
    relativeSkill: 'lance',
    damageSets: [
      {
        dmgMod: 3,
        reach: [4],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  cost: 60,
  weight: 6,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Lance = weaponFabric(weaponSettings);

//TODO: верховое
