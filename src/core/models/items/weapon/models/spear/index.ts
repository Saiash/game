import { Harpoon } from './harpoon';
import { Javelin } from './javelin';
import { LongSpear } from './longSpear';
import { Spear } from './spear';

export type spearList = 'javelin' | 'spear' | 'longSpear' | 'harpoon';

export const spearModels = {
  longSpear: LongSpear,
  javelin: Javelin,
  spear: Spear,
  harpoon: Harpoon,
};
