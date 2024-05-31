import { Cheap } from './cheap';
import { Good } from './good';
import { Great } from './great';

export type meleeModificationList = 'cheap' | 'good' | 'great';

export const meleeModificationModels = {
  cheap: Cheap,
  good: Good,
  great: Great,
};
