import { StabbingTwoHandedSword } from './stabbingTwoHandedSword';
import { TwoHandedSword } from './twoHandedSword';

export type twoHandedSwordList = 'twoHandedSword' | 'stabbingTwoHandedSword';

export const twoHandedSwordModels = {
  twoHandedSword: TwoHandedSword,
  stabbingTwoHandedSword: StabbingTwoHandedSword,
};
