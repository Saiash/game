import { item } from '../../index';
import { characters } from '../../index';

export type zone = {
  locked: boolean;
  item: item.Item;
  parentZone: number | null;
};

export class Doll {
  character: characters.Character;
  zones: {
    [index: number]: zone;
  };

  constructor(character: characters.Character) {
    this.character = character;
    this.zones = {};
  }

  removeItem({
    zoneIndex,
    performer,
  }: {
    zoneIndex: number;
    performer: characters.Character;
  }): boolean {
    const zone = this.zones[zoneIndex];
    if (zone.locked) return false;

    const item = zone.item;
    if (!item) return false;

    item.props.zones.forEach(zone => {
      delete this.zones[zone];
    });

    return performer.inventory.addItem(item);
  }

  checkIfPossibleToEquip(item: item.Item) {
    let value = true;
    item.props.zones.forEach(zoneIndex => {
      if (!this.zones[zoneIndex]) return;
      if (this.zones[zoneIndex].locked) value = false;
    });
    return value;
  }

  equipItem({
    item,
    performer,
  }: {
    item: item.Item;
    performer: characters.Character;
  }): boolean {
    if (!this.checkIfPossibleToEquip(item)) return false;

    item.props.zones.forEach(zoneIndex => {
      this.removeItem({ zoneIndex, performer });
    });

    item.props.zones.forEach((zoneIndex, i) => {
      this.zones[zoneIndex] = {
        locked: false,
        item,
        parentZone: i > 0 ? item.props.zones[0] : null,
      };
    });
    return true;
  }

  switchItemLock(zoneIndex: number) {
    const zone = this.zones[zoneIndex];
    const item = zone.item;
    if (!item) return false;

    item.props.zones.forEach(zone => {
      this.zones[zone].locked = this.zones[zone].locked ? false : true;
    });
  }

  getEquippedItems(): item.Item[] {
    const items: item.Item[] = [];
    for (const zoneIndex in this.zones) {
      const item = this.zones[zoneIndex].item;
      if (!this.zones[zoneIndex].parentZone) items.push(item);
    }
    return items;
  }

  getRaw() {}

  initFromRaw() {}
}
