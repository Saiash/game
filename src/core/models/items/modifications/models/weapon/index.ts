import { ArmorPiercing } from './armorPiercing';
import { Cheap } from './cheap';
import { Good } from './good';
import { Great } from './great';
import { Parade } from './parade';

export type weaponModificationList =
  | 'cheap'
  | 'good'
  | 'great'
  | 'parade'
  | 'armorPiercing';

export const weaponModificationModels = {
  cheap: Cheap,
  good: Good,
  great: Great,
  parade: Parade,
  armorPiercing: ArmorPiercing,
};
