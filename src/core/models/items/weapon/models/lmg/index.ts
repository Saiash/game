import { GroupLmg } from './groupLmg';
import { Lmg50 } from './lmg50';
import { Rp762 } from './rp762';

export type lmgList = 'groupLmg' | 'lmg50' | 'rp762';

export const lmgModels = { groupLmg: GroupLmg, lmg50: Lmg50, rp762: Rp762 };
