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

  constructor({
    attributeProps,
    inventoryProps,
    skillProps,
    name,
  }: {
    attributeProps?: attributes.AttributeProps[];
    inventoryProps?: { [index: number]: item.Item };
    skillProps?: skills.InputSkillProps[];
    name: string;
  }) {
    this.tags = new TagSystem();
    this.attributes = new attributes.Attributes(attributeProps);
    this.inventory = new inventory.Inventory(inventoryProps);
    this.skills = new skills.Skills(this, {
      skills: skillProps,
      attributes: this.attributes,
    });
    this.name = name;
    this.doll = new doll.Doll(this);
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
