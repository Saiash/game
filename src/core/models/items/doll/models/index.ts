import { Doll } from '..';
import { CTX, PartialRecord } from '../../../../../types';
import { Character } from '../../../characters';
import { Item, ItemId } from '../../item';
import { battleZones, equipZones } from '../types';
import { ChestBodyPart, PelvisBodyPart, TorsoBodyPart } from './_body';

export type bodypartProps = {
  character: Character;
  ctx: CTX;
  code: equipZones | battleZones;
};

export const specialBodyPartsList: PartialRecord<
  equipZones | battleZones,
  typeof DollBodyPart
> = {
  torso: TorsoBodyPart,
  chest: ChestBodyPart,
  pelvis: PelvisBodyPart,
};

export class DollBodyPart {
  innerParts: Record<equipZones | battleZones, DollBodyPart>;
  hp: number;
  ctx: CTX;
  character: Character;
  code: equipZones | battleZones;
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
      const _part = part as equipZones | battleZones;
      const classModel = !!specialBodyPartsList[_part]
        ? specialBodyPartsList[_part]
        : DollBodyPart;
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

  isPossibleToEquip() {
    if (Object.keys(this.equippedItems).length !== 0) {
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
}

//У предмета есть набор вариантов - куда его экипировать
//Нужна функция проверки наборов - какие из них доступны
//С клиента всегда прилетает, куда экипировать предмет - в виде массива значений
//Если его вдруг нет - то первый доступный слот

//для экипирования всегда пробрасываем в указанные слоты
//указанные слоты сами пропишут в себя предмет и во все дочерние для них слоты
