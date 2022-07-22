import { CTX } from '../../types';
import { attributes } from '../index';
import { inventory } from '../index';
import { item } from '../index';
import { skills } from '../index';
import { doll } from '../index';
import { Location } from '../locations';
import { TagSystem } from '../tag';
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
    this.tags = new TagSystem(ctx);
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

  getAvaliableActons(): {
    [index: string]: {
      source: item.Item;
      difficulty: number;
      slot?: number | undefined;
    }[];
  } {
    return this.tags.skillsTargets;
  }

  getRaw() {}

  initFromRaw() {}
}
