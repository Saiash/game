import { CTX } from '../../../../types';
import { throwDices } from '../../../utils/diceThrower';
import { Character } from '../../characters';
import { Item, ItemId } from '../item';
import { damageType } from '../weapon/damage';
import { DollBodyPart, specialBodyPartsList } from './models';
import {
  battleZones,
  dollStructure,
  equipZones,
  majorBodyParts,
} from './types';

export class Doll {
  character: Character;
  ctx: CTX;
  bodyParts: Record<equipZones | battleZones, DollBodyPart>;
  equippedItems: Record<ItemId, Item> = [];

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.character = character;
    this.bodyParts = {} as unknown as Record<
      equipZones | battleZones,
      DollBodyPart
    >;
    Object.keys(dollStructure).forEach(part => {
      const _part = part as majorBodyParts;
      const classModel = !!specialBodyPartsList[_part]
        ? specialBodyPartsList[_part]
        : DollBodyPart;
      new classModel({
        innerParts: dollStructure[_part],
        character,
        ctx,
        code: _part,
        dollManager: this,
      });
    });
  }

  addBodyPart(code: equipZones | battleZones, bodyPart: DollBodyPart) {
    this.bodyParts[code] = bodyPart;
  }

  equipItem({
    item,
    performer,
    zoneIndex,
  }: {
    item: Item;
    performer: Character;
    zoneIndex?: number;
  }): boolean {
    if (zoneIndex) {
      return this.equipItemByZoneIndex({ item, zoneIndex });
    }
    let equipped = false;
    item.zones.forEach((zoneNameGroup, zoneIndex) => {
      if (!equipped) {
        equipped = this.equipItemByZoneIndex({ item, zoneIndex });
      }
    });
    return equipped;
  }

  private equipItemByZoneIndex({
    item,
    zoneIndex,
  }: {
    item: Item;
    zoneIndex: number;
  }) {
    const zoneGroup = item.zones[zoneIndex];
    if (!this.ifPossibleToEquipForZone(zoneGroup)) {
      return false;
    }
    zoneGroup.forEach(zoneName => {
      this.getZoneByCode(zoneName).eqiupItem(item);
    });
    return true;
  }

  recordEquippedItem(item: Item) {
    if (!this.equippedItems[item.getId()]) {
      this.equippedItems[item.getId()] = item;
    }
  }

  unrecordEquippedItem(itemId: ItemId) {
    if (this.equippedItems[itemId]) {
      delete this.equippedItems[itemId];
    }
  }

  getItemById(id: ItemId): Item {
    return this.equippedItems[id];
  }

  unequipItem({
    itemId,
    performer,
  }: {
    itemId: ItemId;
    performer: Character;
  }): boolean {
    const item = this.getItemById(itemId);

    item.zones.forEach(zoneNameGroup => {
      zoneNameGroup.forEach(zoneName => {
        this.getZoneByCode(zoneName).uneqiupItem(item);
      });
    });
    this.unrecordEquippedItem(itemId);

    return performer.inventory.add(item); //TODO?
  }

  checkIfPossibleToEquip(item: Item) {
    //TODO: можно надевать до трех слоев брони. Каждый последующий слой дает -1 к DX. Броня должна быть гибкой (flexible) для внутренних слоев. То, что не дает брони - не дает штрафов.
    return item.zones.some(zoneNameGroup => {
      return this.ifPossibleToEquipForZone(zoneNameGroup);
    });
  }

  private ifPossibleToEquipForZone(zone: equipZones[]) {
    return zone.every(zoneName => {
      return this.getZoneByCode(zoneName).isPossibleToEquip();
    });
  }

  equipFromInventory({ index }: { index: number }): boolean {
    const item = this.character.inventory.getItem(index);
    const equipped = this.equipItem({ item, performer: this.character });
    if (equipped) {
      this.character.inventory.removeItem(index);
      item.setOwner(this.character);
      this.ctx.gameData.log.addEvent({
        text: `Item equipped: ${item.getName()}`,
      });
    }
    return equipped;
  }

  getEquippedItems() {
    return this.equippedItems;
  }

  getItemsByZone(code: equipZones) {
    return this.getZoneByCode(code).getAllItems();
  }

  receiveDamageByZone(damage: number, zone: string, type: damageType) {
    return null; // TODO
  }

  getZoneByCode(zone: equipZones) {
    return this.bodyParts[zone];
  }

  getRaw() {}

  initFromRaw() {}

  getInnerPartByKey(key: equipZones | battleZones) {
    return this.bodyParts[key];
  }

  getRandomHitPart() {
    const roll = throwDices(3, 6);
    if (roll <= 4) {
      return this.getInnerPartByKey('head').getInnerPartByKey('skull');
    } else if (roll === 5) {
      return this.getInnerPartByKey('head').getInnerPartByKey('face');
    } else if ([6, 7].includes(roll)) {
      return this.getInnerPartByKey('leftLeg');
    } else if ([13, 14].includes(roll)) {
      return this.getInnerPartByKey('rightLeg');
    } else if (roll === 8) {
      return this.getInnerPartByKey('leftHand');
    } else if (roll === 12) {
      return this.getInnerPartByKey('rightHand');
    } else if ([9, 10].includes(roll)) {
      return this.getInnerPartByKey('torso').getInnerPartByKey('chest');
    } else if (roll === 11) {
      return this.getInnerPartByKey('torso').getInnerPartByKey('belly');
    } else if (roll === 15) {
      return throwDices(1, 2) === 1
        ? this.getInnerPartByKey('leftHand').getInnerPartByKey('palm')
        : this.getInnerPartByKey('rightHand').getInnerPartByKey('palm');
    } else if (roll === 16) {
      return throwDices(1, 2) === 1
        ? this.getInnerPartByKey('leftLeg').getInnerPartByKey('foot')
        : this.getInnerPartByKey('rightLeg').getInnerPartByKey('foot');
    } else if ([17, 18].includes(roll)) {
      return this.getInnerPartByKey('neck');
    }
  }
}

//
