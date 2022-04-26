import { CTX } from '../../types';
import { attributes } from '../index';
import { inventory } from '../index';
import { item } from '../index';
import { skills } from '../index';
import { doll } from '../index';
import { TagSystem } from '../tag';

export class Character {
  attributes: attributes.Attributes;
  inventory: inventory.Inventory;
  skills: skills.Skills;
  doll: doll.Doll;
  name: string;
  tags: TagSystem;
  ctx: CTX;

  constructor({
    ctx,
    attributeProps,
    inventoryProps,
    skillProps,
    name,
  }: {
    ctx: CTX;
    attributeProps?: attributes.AttributeProps[];
    inventoryProps?: { [index: number]: item.Item };
    skillProps?: skills.InputSkillProps[];
    name: string;
  }) {
    this.ctx = ctx;
    this.tags = new TagSystem(ctx);
    this.attributes = new attributes.Attributes({
      ctx,
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
