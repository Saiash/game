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
  private status: string[] = [];
  private inventory: Inventory;
  private locked: boolean;

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
      items?: { [index: number]: Item };
    };
  }) {
    this.id = itemId++;
    this.location = location;
    this.ctx = ctx;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.tags = new TagSystem(ctx, { props: data.tags });
    this.inventory = new Inventory({
      ctx,
      container: this,
      items: data.items,
    });
    this.locked = data.locked || false;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
