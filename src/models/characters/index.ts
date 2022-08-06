import { CTX } from '../../types';
import { attributes } from '../index';
import { inventory } from '../index';
import { item } from '../index';
import { skills } from '../index';
import { doll } from '../index';
import { Location } from '../locations';
import { TagSystem } from '../tag';
import { Tag } from '../tag/models/tag';
import { SecondaryAttributes } from './secondaryAttributes';

let itemId = 0;

export class Character {
  attributes: attributes.Attributes;
  secondaryAttributes: SecondaryAttributes;
  inventory: inventory.Inventory;
  skills: skills.Skills;
  doll: doll.Doll;
  name: string;
  tags: TagSystem;
  ctx: CTX;
  id: number;
  location: Location;
  status: string[] = [];

  constructor({
    ctx,
    attributeProps,
    inventoryProps,
    skillProps,
    name,
    location,
  }: {
    ctx: CTX;
    attributeProps?: attributes.AttributeProps[];
    inventoryProps?: { [index: number]: item.Item };
    skillProps?: skills.InputSkillProps[];
    name: string;
    location: Location;
  }) {
    this.id = itemId++;
    this.location = location;
    this.ctx = ctx;
    this.tags = new TagSystem({ ctx, owner: this });
    this.attributes = new attributes.Attributes({
      ctx,
      character: this,
      inputAttrs: attributeProps,
    });
    this.inventory = new inventory.Inventory({
      ctx,
      character: this,
      items: inventoryProps,
    });
    this.skills = new skills.Skills({
      ctx,
      character: this,
      input: {
        skills: skillProps,
        attributes: this.attributes,
      },
    });
    this.name = name;
    this.doll = new doll.Doll({ ctx, character: this });
    this.secondaryAttributes = new SecondaryAttributes({
      ctx,
      character: this,
    });
  }

  /**
   * Все действия доступные персонажу с самим собой, локацией и текущей целью
   */
  getAvaliableActons(): {
    [index: string]: Tag[];
  } {
    const result: { [index: string]: Tag[] } = {};
    const tags = this.tags.getActiveSkills();
    Object.keys(tags).forEach(tagId => {
      if (!result[tags[tagId].getName()]) {
        result[tags[tagId].getName()] = [];
      }
      result[tags[tagId].getName()].push(tags[tagId]);
    });
    return result;
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

  isLocked(): boolean {
    return false;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getRaw() {}

  initFromRaw() {}
}
