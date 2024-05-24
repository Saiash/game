import { Character } from '../../../../characters';
import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'battleNet',
  throw: {
    relativeSkill: 'net',
    bulk: 4,
    aim: 0,
    range: { maxRange: 0.5, strBased: true },
    damageSets: [
      {
        dmgMod: -8,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  cost: 20,
  weight: 5,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = (targer: Character) => {
  //TODO: может опутать?
};

export const BattleNet = weaponFabric(weaponSettings, resolver);
