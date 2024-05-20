import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'stunner',
  melee: {
    relativeSkill: 'brawling',
    damageSets: [
      {
        dmgMod: -1,
        reach: [0, 1],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  techLevel: 8,
  cost: 0,
  weight: 0,
  strRequired: 0,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Stunner = weaponFabric(weaponSettings);

//TODO: Если бросок ЗД провален, цель оглушена на время касания оружия плюс 20-ЗД секунд, а затем может сделать бросок ЗД-3, чтобы прийти в себя.
