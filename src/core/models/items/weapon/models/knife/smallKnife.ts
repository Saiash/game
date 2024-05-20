import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'smallKnife',
  melee: {
    relativeSkill: 'knife',
    damageSets: [
      {
        dmgMod: -3,
        reach: [0, 1],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: -1,
        reach: [0],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: -1,
    },
  },
  cost: 30,
  weight: 0.5,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SmallKnife = weaponFabric(weaponSettings);
