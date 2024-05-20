import { CTX } from '../../../types';
import { ITEMS_LIST, itemsList } from './fabric';
import { modificationsList } from './modifications/fabric';

export class ItemManager {
  static createItemByCode(
    code: itemsList,
    ctx: CTX,
    modifications?: modificationsList[]
  ) {
    return ITEMS_LIST[code]({
      ctx,
      modification: modifications,
    });
  }
}
