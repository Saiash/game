import { CTX } from '../../../types';
import { ITEMS_LIST, itemsList } from './fabric';

export class ItemManager {
  static createItemByCode(code: itemsList, ctx: CTX) {
    return ITEMS_LIST[code]({
      ctx,
    });
  }
}
