import { Bow } from './bow';
import { CompositeBow } from './compositeBow';
import { LongBow } from './longBow';
import { ShortBow } from './shortBow';

export type bowList = 'bow' | 'longBow' | 'shortBow' | 'compositeBow';

export const bowModels = {
  bow: Bow,
  longBow: LongBow,
  shortBow: ShortBow,
  compositeBow: CompositeBow,
};
