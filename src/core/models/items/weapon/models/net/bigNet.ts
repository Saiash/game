import { Character } from '../../../../characters';
import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'bigNet',
  throw: {
    relativeSkill: 'net',
    bulk: 6,
    aim: 1,
    range: { maxRange: 1, strBased: true },
    damageSets: [
      {
        dmgMod: -8,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  cost: 40,
  weight: 20,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = (targer: Character) => {
  //TODO: может опутать?
};

export const BigNet = weaponFabric(weaponSettings, resolver);
