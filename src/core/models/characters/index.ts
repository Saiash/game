import { CTX } from '../../../types';
import { AttributeManager, AttributeProps } from './attributes';
import { SkillManager, InputSkillProps } from '../skills/skillManager';
import { Location } from '../../models/locations';
import { TagSystem } from '../../managers/tag';
import { Tag } from '../../managers/tag/models/tag';
import { SecondaryAttributes } from './secondaryAttributes';
import { Inventory } from '../items';
import { PerkManager } from '../perks/perkManager';
import { Doll } from '../items/doll';
import { LoreManager } from '../lore/loreManager';
import { Item } from '../items/item';
import { BattleManager } from './battle';

let characterId = 0;

export class Character {
  battleManager: BattleManager;
  attributeManager: AttributeManager;
  secondaryAttributes: SecondaryAttributes;
  inventory: Inventory;
  skillManager: SkillManager;
  perkManager: PerkManager;
  doll: Doll;
  private name: string;
  tags: TagSystem;
  private ctx: CTX;
  private id: number;
  private location: Location;
  lore: LoreManager;
  private status: string[] = [];
  private gender: 'male' | 'female';
  private cultures: string[] = [];
  private socialGroups: string[];
  private socialStatus: number;

  constructor({
    ctx,
    attributeProps,
    inventoryProps,
    skillProps,
    name,
    gender,
    location,
    cultures,
    socialGroups,
    socialStatus,
  }: {
    ctx: CTX;
    attributeProps?: AttributeProps[];
    inventoryProps?: { [index: number]: Item };
    skillProps?: InputSkillProps[];
    name: string;
    gender: 'male' | 'female';
    location: Location;
    cultures?: string[];
    socialGroups?: string[];
    socialStatus?: number;
  }) {
    this.id = characterId++;
    this.location = location;
    this.ctx = ctx;
    this.gender = gender;
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
    this.perkManager = new PerkManager({
      ctx,
      character: this,
      input: {},
    });
    this.tags = new TagSystem({ ctx, owner: this });
    this.name = name;
    this.cultures = cultures || ['default'];
    this.socialGroups = socialGroups || [];
    this.socialStatus = socialStatus || 0;
    this.doll = new Doll({ ctx, character: this });
    this.secondaryAttributes = new SecondaryAttributes({
      ctx,
      character: this,
    });
    this.lore = new LoreManager({ ctx });
    this.battleManager = new BattleManager({ ctx, character: this });
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

  getGender(): string {
    return this.gender;
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

  getLocation() {
    return this.location;
  }

  getCultures(): string[] {
    return this.cultures;
  }

  getSocialGroups(): string[] {
    return this.socialGroups;
  }

  getSocialStatus(): number {
    return this.socialStatus;
  }

  initFromRaw() {}
}
