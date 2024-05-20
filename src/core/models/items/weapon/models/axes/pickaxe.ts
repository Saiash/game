import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'pickaxe',
  melee: {
    relativeSkill: 'axeMace',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1],
        damageType: 'imp',
        attackType: 'swing',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  techLevel: 3,
  cost: 70,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Pickaxe = weaponFabric(weaponSettings);

//TODO: может застрять
