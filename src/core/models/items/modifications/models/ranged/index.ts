import { Good } from './good';
import { Great } from './great';

export type rangedModificationList = 'rangedGood' | 'rangedGreat';

export const rangedModificationModels = {
  rangedGood: Good,
  rangedGreat: Great,
};
