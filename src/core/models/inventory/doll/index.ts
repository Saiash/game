import { CTX } from '../../../../types';
import { Character } from '../../characters';
import { Item } from '../item';

export type zone = {
  item: Item;
  parentZone: number | null;
};

export class Doll {
  character: Character;
  ctx: CTX;
  zones: {
    [index: number]: zone;
  };

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.character = character;
    this.zones = {};
  }

  uneqipItem({ zoneIndex }: { zoneIndex: number }): boolean {
    return this.removeItem({ zoneIndex, performer: this.character });
  }

  removeItem({
    zoneIndex,
    performer,
  }: {
    zoneIndex: number;
    performer: Character;
  }): boolean {
    if (!this.zones[zoneIndex]) return false;
    const zone = this.zones[zoneIndex];
    if (zone.item.locked) return false;

    const item = zone.item;
    if (!item) return false;

    item.props.zones.forEach(zone => {
      delete this.zones[zone];
    });

    this.character.tags.removeTagSystem(item.props.tags);
    return performer.inventory.add(item);
  }

  checkIfPossibleToEquip(item: Item) {
    let value = true;
    item.props.zones.forEach(zoneIndex => {
      if (!this.zones[zoneIndex]) return;
      if (this.zones[zoneIndex].item.locked) value = false;
    });
    return value;
  }

  equipItem({
    item,
    performer,
  }: {
    item: Item;
    performer: Character;
  }): boolean {
    if (!this.checkIfPossibleToEquip(item)) return false;

    item.props.zones.forEach(zoneIndex => {
      this.removeItem({ zoneIndex, performer });
    });

    item.props.zones.forEach((zoneIndex, i) => {
      this.zones[zoneIndex] = {
        item,
        parentZone: i > 0 ? item.props.zones[0] : null,
      };
    });
    this.character.tags.applyTagSystem(item.props.tags);
    return true;
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

  getEquippedItems(): [number, Item][] {
    const items: [number, Item][] = [];
    for (const zoneIndex in this.zones) {
      const item = this.zones[zoneIndex].item;
      if (!this.zones[zoneIndex].parentZone)
        items.push([parseInt(zoneIndex), item]);
    }
    return items;
  }

  getItemByZone(zone: number): Item | null {
    return this.zones[zone].item ? this.zones[zone].item : null;
  }

  lockZone(index: number) {
    const item = this.getItemByZone(index);
    if (!item) return;
    item.lock();
  }

  unlockZone(index: number) {
    const item = this.getItemByZone(index);
    if (!item) return;
    item.unlock();
  }

  getRaw() {}

  initFromRaw() {}
}

//
