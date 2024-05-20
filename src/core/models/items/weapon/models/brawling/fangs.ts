import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'fangs',
  melee: {
    relativeSkill: 'brawling',
    damageSets: [
      {
        dmgMod: -1,
        reach: [0],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  techLevel: 0,
  cost: 0,
  weight: 0,
  strRequired: 0,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Fangs = weaponFabric(weaponSettings);
