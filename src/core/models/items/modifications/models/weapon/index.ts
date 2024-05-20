import { Cheap } from './cheap';
import { Good } from './good';
import { Great } from './great';
import { Parade } from './parade';

export type weaponModificationList = 'cheap' | 'good' | 'great' | 'parade';

export const weaponModificationModels = {
  cheap: Cheap,
  good: Good,
  great: Great,
  parade: Parade,
};
