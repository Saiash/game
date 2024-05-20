import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'axe',
  melee: {
    relativeSkill: 'axeMace',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  techLevel: 0,
  cost: 50,
  weight: 4,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Axe = weaponFabric(weaponSettings);
