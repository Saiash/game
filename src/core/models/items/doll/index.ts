import { trimEnd } from 'lodash';
import { CTX } from '../../../../types';
import { Character } from '../../characters';
import { Item, ItemId } from '../item';
import { damageTypes } from '../weapon/damage';
import { DollBodyPart } from './models/bodypart';
import { dollStructure, equipZones, majorBodyParts } from './types';

export class Doll {
  character: Character;
  ctx: CTX;
  bodyParts: Record<equipZones, DollBodyPart>;
  equippedItems: Record<ItemId, Item> = [];

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.character = character;
    this.bodyParts = {} as unknown as Record<equipZones, DollBodyPart>;
    Object.keys(dollStructure).forEach(part => {
      const _part = part as majorBodyParts;
      new DollBodyPart({
        innerParts: dollStructure[_part],
        character,
        ctx,
        code: _part,
        dollManager: this,
      });
    });
  }

  addBodyPart(code: equipZones, bodyPart: DollBodyPart) {
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

  receiveDamageByZone(damage: number, zone: string, type: damageTypes) {
    return null; // TODO
  }

  getZoneByCode(zone: equipZones) {
    return this.bodyParts[zone];
  }

  getRaw() {}

  initFromRaw() {}
}

//
