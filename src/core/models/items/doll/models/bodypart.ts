import { Doll } from '..';
import { CTX } from '../../../../../types';
import { Character } from '../../../characters';
import { Item, ItemId } from '../../item';
import { equipZones } from '../types';

export type bodypartProps = {
  character: Character;
  ctx: CTX;
  code: equipZones;
};

export class DollBodyPart {
  innerParts: Record<equipZones, DollBodyPart>;
  hp: number;
  ctx: CTX;
  character: Character;
  code: equipZones;
  equipZones: equipZones[] = [];
  equippedItems: Record<ItemId, Item> = [];
  dollManager: Doll;

  constructor({
    character,
    ctx,
    code,
    innerParts,
    dollManager,
  }: bodypartProps & { innerParts: any; dollManager: Doll }) {
    const record: Record<string, DollBodyPart> = {};
    Object.keys(innerParts).forEach(part => {
      const _part = part as equipZones;
      record[_part] = new DollBodyPart({
        innerParts: innerParts[_part],
        character,
        ctx,
        code: _part,
        dollManager,
      });
    });
    this.innerParts = record;
    this.hp = 10; // TODO
    this.character = character;
    this.ctx = ctx;
    this.code = code;
    this.dollManager = dollManager;
    dollManager.addBodyPart(code, this);
  }

  eqiupItem(item: Item) {
    this.equippedItems[item.getId()] = item;
    Object.keys(this.innerParts).forEach(key => {
      const _key = key as equipZones;
      this.innerParts[_key].eqiupItem(item);
    });
    this.dollManager.recordEquippedItem(item);
  }

  uneqiupItem(item: Item) {
    delete this.equippedItems[item.getId()];
    Object.keys(this.innerParts).forEach(key => {
      const _key = key as equipZones;
      this.innerParts[_key].uneqiupItem(item);
    });
    this.dollManager.unrecordEquippedItem(item.getId());
  }

  isPossibleToEquip() {
    if (Object.keys(this.equippedItems).length !== 0) {
      return false;
    }
    Object.keys(this.innerParts).forEach(key => {
      const _key = key as equipZones;
      if (!this.innerParts[_key].isPossibleToEquip()) {
        return false;
      }
    });
    return true;
  }

  getAllItems() {
    return this.equippedItems;
  }
}

//У предмета есть набор вариантов - куда его экипировать
//Нужна функция проверки наборов - какие из них доступны
//С клиента всегда прилетает, куда экипировать предмет - в виде массива значений
//Если его вдруг нет - то первый доступный слот

//для экипирования всегда пробрасываем в указанные слоты
//указанные слоты сами пропишут в себя предмет и во все дочерние для них слоты
