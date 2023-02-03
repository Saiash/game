import { Location } from '.';
import { CTX } from '../../types';
import { Character } from '../characters';
import { Inventory } from '../characters/inventory';
import { Item } from '../characters/inventory/item';
import { TagSystem } from '../tag';
import { Tag } from '../tag/models/tag';

export type rawObjectModel = {
  name: string;
  code: string;
  description: string;
  tags: string;
  locked?: boolean;
  lockable?: boolean;
  status?: string[];
  items?: { [index: number]: Item };
};

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
    data: rawObjectModel;
  }) {
    this.id = itemId++;
    this.location = location;
    this.ctx = ctx;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;

    this.inventory = new Inventory({
      ctx,
      container: this,
      items: data.items,
    });
    this.status = data?.status || [];
    this.locked = this.status?.some(s => s === 'locked') || false;
    this.lockable =
      this.status?.some(s => s === 'lockable') || this.locked || false;
    this.tags = new TagSystem({
      ctx,
      input: { props: data.tags },
      owner: this,
    });
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  hasStatus(status: string): boolean {
    return this.status.some(s => {
      return s === status;
    });
  }

  addStatus(status: string): boolean {
    if (this.hasStatus(status)) return false;
    this.status.push(status);
    this.tags.conditionChanged(status);
    return true;
  }

  removeStatus(status: string): boolean {
    this.status = this.status.filter(s => s !== status);
    this.tags.conditionChanged(status);
    return true;
  }

  lock() {
    this.locked = true;
    this.tags.conditionChanged('locked');
    this.addStatus('locked');
    return true;
  }

  unlock() {
    this.locked = false;
    this.tags.conditionChanged('locked');
    this.removeStatus('locked');
    return true;
  }

  isLockable() {
    return this.lockable && !this.locked;
  }

  isLocked() {
    return this.locked;
  }

  getAvaliableActons({ actor }: { actor?: Character }): {
    [index: string]: Tag[];
  } {
    const result: { [index: string]: Tag[] } = {};
    const skillTags = this.tags.getActiveSkills({ actor });
    Object.keys(skillTags).forEach(tagId => {
      if (!result[skillTags[tagId].getName()]) {
        result[skillTags[tagId].getName()] = [];
      }
      result[skillTags[tagId].getName()].push(skillTags[tagId]);
    });
    const actionTags = this.tags.getActiveActions({ actor });
    Object.keys(actionTags).forEach(tagId => {
      if (!result[actionTags[tagId].getName()]) {
        result[actionTags[tagId].getName()] = [];
      }
      result[actionTags[tagId].getName()].push(actionTags[tagId]);
    });
    return result;
  }
}
