import { Doll, specialBodyPartsList } from '..';
import { CTX } from '../../../../../types';
import { Character } from '../../../characters';
import { Armor } from '../../armor';
import { Item, ItemId } from '../../item';
import { battleZones, equipZones } from '../types';

export type bodypartProps = {
  character: Character;
  ctx: CTX;
  code: equipZones | battleZones;
};

export class DollBodyPart {
  innerParts: Record<equipZones | battleZones, DollBodyPart>;
  hp: number;
  ctx: CTX;
  character: Character;
  code: equipZones | battleZones;
  equipZones: equipZones[] = [];
  equippedItems: Record<ItemId, Item> = {};
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
      const _part = part as equipZones | battleZones;
      let classModel = specialBodyPartsList[_part];
      if (!classModel) classModel = DollBodyPart;
      record[_part] = new classModel({
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

  getInnerPartByKey(key: equipZones | battleZones) {
    return this.innerParts[key];
  }

  eqiupItem(item: Item) {
    this.equippedItems[item.getId()] = item;
    Object.keys(this.innerParts).forEach(key => {
      const _key = key as equipZones | battleZones;
      this.innerParts[_key].eqiupItem(item);
    });
    this.dollManager.recordEquippedItem(item);
  }

  uneqiupItem(item: Item) {
    delete this.equippedItems[item.getId()];
    Object.keys(this.innerParts).forEach(key => {
      const _key = key as equipZones & battleZones;
      this.innerParts[_key].uneqiupItem(item);
    });
    this.dollManager.unrecordEquippedItem(item.getId());
  }

  isPossibleToEquip(item?: Item) {
    if (Object.keys(this.equippedItems).length >= 3) {
      return false;
    }
    if (item instanceof Armor && item.getArmorType() === 'flexible') {
      //TODO: доделать условия
      // подниз можно надевать только скрытого ношения и/или одежду?
      return true;
    }
    if (
      Object.values(this.getAllItems()).some(
        i => i instanceof Armor && i.getArmorType() === 'rigit'
      )
    ) {
      return false;
    }
    Object.keys(this.innerParts).forEach(key => {
      const _key = key as equipZones & battleZones;
      if (!this.innerParts[_key].isPossibleToEquip()) {
        return false;
      }
    });
    return true;
  }

  getAllItems() {
    return this.equippedItems;
  }

  getZoneHit(): DollBodyPart {
    return this;
  }

  getDr(): number {
    const items = this.getAllItems();
    return Object.values(items).reduce((acc, item) => {
      return acc + item.getDr();
    }, 0);
  }
}

//TODO: У предмета есть набор вариантов - куда его экипировать
//TODO: Нужна функция проверки наборов - какие из них доступны
//TODO: С клиента всегда прилетает, куда экипировать предмет - в виде массива значений
//TODO: Если его вдруг нет - то первый доступный слот

//TODO: для экипирования всегда пробрасываем в указанные слоты
//TODO: указанные слоты сами пропишут в себя предмет и во все дочерние для них слоты
