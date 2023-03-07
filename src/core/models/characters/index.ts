import { CTX } from '../../../types';
import { AttributeManager, AttributeProps } from './attributes';
import { Inventory } from './inventory';
import { Item } from './inventory/item';
import { SkillManager, InputSkillProps } from './skills';
import { Doll } from './inventory/doll';
import { Location } from '../../models/locations';
import { TagSystem } from '../../managers/tag';
import { Tag } from '../../managers/tag/models/tag';
import { LoreManager } from './lore/loreManager';
import { SecondaryAttributes } from './secondaryAttributes';

let itemId = 0;

export class Character {
  attributeManager: AttributeManager;
  secondaryAttributes: SecondaryAttributes;
  inventory: Inventory;
  skillManager: SkillManager;
  doll: Doll;
  name: string;
  tags: TagSystem;
  ctx: CTX;
  id: number;
  location: Location;
  lore: LoreManager;
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
    attributeProps?: AttributeProps[];
    inventoryProps?: { [index: number]: Item };
    skillProps?: InputSkillProps[];
    name: string;
    location: Location;
  }) {
    this.id = itemId++;
    this.location = location;
    this.ctx = ctx;
    this.tags = new TagSystem({ ctx, owner: this });
    this.attributeManager = new AttributeManager({
      ctx,
      character: this,
      inputAttrs: attributeProps,
    });
    this.inventory = new Inventory({
      ctx,
      character: this,
      items: inventoryProps,
    });
    this.skillManager = new SkillManager({
      ctx,
      character: this,
      input: {
        skills: skillProps,
        attributes: this.attributeManager,
      },
    });
    this.name = name;
    this.doll = new Doll({ ctx, character: this });
    this.secondaryAttributes = new SecondaryAttributes({
      ctx,
      character: this,
    });
    this.lore = new LoreManager({ ctx });
  }

  /**
   * Все действия доступные персонажу с самим собой, локацией и текущей целью
   */
  getAvaliableActons(): {
    [index: string]: Tag[];
  } {
    const result: { [index: string]: Tag[] } = {};
    const tags = this.tags.getActiveSkills({});
    Object.keys(tags).forEach(tagId => {
      if (!result[tags[tagId].getName()]) {
        result[tags[tagId].getName()] = [];
      }
      result[tags[tagId].getName()].push(tags[tagId]);
    });

    const actionTags = this.tags.getActiveActions({});
    Object.keys(actionTags).forEach(tagId => {
      if (!result[actionTags[tagId].getName()]) {
        result[actionTags[tagId].getName()] = [];
      }
      result[actionTags[tagId].getName()].push(actionTags[tagId]);
    });

    if (this.ctx.gameData.playerTarget) {
      const targetTags = this.ctx.gameData.playerTarget.getAvaliableActons({
        actor: this,
      });
      Object.keys(targetTags).forEach(targetTypeName => {
        if (!result[targetTypeName]) {
          result[targetTypeName] = [];
        }
        result[targetTypeName].push(...targetTags[targetTypeName]);
      });
    }
    return result;
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
