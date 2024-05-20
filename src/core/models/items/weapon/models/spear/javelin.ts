import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'javelin',
  melee: {
    relativeSkill: 'spear',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  cost: 30,
  weight: 2,
  strRequired: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Javelin = weaponFabric(weaponSettings);
