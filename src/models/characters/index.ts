import { attributes } from '../index';
import { inventory } from '../index';
import { item } from '../index';
import { skills } from '../index';
import { doll } from '../index';

export class Character {
  attributes: attributes.Attributes;
  inventory: inventory.Inventory;
  skills: skills.Skills;
  doll: doll.Doll;
  name: string;

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
    this.attributes = new attributes.Attributes(attributeProps);
    this.inventory = new inventory.Inventory(inventoryProps);
    this.skills = new skills.Skills(this, {
      skills: skillProps,
      attributes: this.attributes,
    });
    this.name = name;
    this.doll = new doll.Doll(this);
  }

  getRaw() {}

  initFromRaw() {}
}
