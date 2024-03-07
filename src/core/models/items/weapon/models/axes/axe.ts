import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'axe',
  relativeSkill: 'axeMace',
  techLevel: 0,
  dmgMod: 2,
  damageType: 'cut',
  reach: [1],
  parry: [0, 'unbalanced'],
  cost: 50,
  weight: 4,
  strRequired: 11,
  img: '',
  zones: [3100],
};

export const Axe = weaponFabric(weaponSettings);
