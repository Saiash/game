import { Location } from '.';
import { CTX } from '../../types';
import { Inventory } from '../characters/inventory';
import { Item } from '../characters/inventory/item';
import { TagSystem } from '../tag';

let itemId = 0;
export class ObjectModel {
  private id: number;
  private name: string;
  private code: string;
  private description: string;
  private tags: TagSystem;
  private ctx: CTX;
  private location: Location;
  private inventory: Inventory;
  private status: string[] = [];
  private locked: boolean;
  private lockable: boolean;

  constructor({
    ctx,
    location,
    data,
  }: {
    ctx: CTX;
    location: Location;
    data: {
      name: string;
      code: string;
      description: string;
      tags: string;
      locked?: boolean;
      lockable?: boolean;
      items?: { [index: number]: Item };
    };
  }) {
    this.id = itemId++;
    this.location = location;
    this.ctx = ctx;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.tags = new TagSystem({
      ctx,
      input: { props: data.tags },
      owner: this,
    });
    this.inventory = new Inventory({
      ctx,
      container: this,
      items: data.items,
    });
    this.locked = data.locked || false;
    this.lockable = data.lockable || false;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  hasStatus(status: string): boolean {
    return this.status.some(s => {
      s === status;
    });
  }

  addStatus(status: string): boolean {
    if (this.hasStatus(status)) return false;
    this.status.push(status);
    return true;
  }

  removeStatus(status: string): boolean {
    this.status = this.status.filter(s => s !== status);
    return true;
  }

  lock() {
    this.locked = true;
    this.tags.conditionChanged('locked');
    return true;
  }

  unlock() {
    this.locked = false;
    this.tags.conditionChanged('locked');
    return true;
  }

  isLockable() {
    return this.lockable && !this.locked;
  }

  isLocked() {
    return this.locked;
  }
}
