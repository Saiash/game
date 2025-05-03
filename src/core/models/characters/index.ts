import { CTX } from '../../../types';
import { AttributeManager } from './attributes';
import { SkillManager } from './skills/skillManager';
import { TagSystem } from '../../managers/tag';
import { Tag } from '../../managers/tag/models/tag';
import { SecondaryAttributes } from './secondaryAttributes';
import { Inventory } from '../items';
import { PerkManager } from '../perks/perkManager';
import { Doll } from '../items/doll';
import { LoreManager } from '../lore/loreManager';
import { Item } from '../items/item';
import { BattleManager } from './battle';
import { InputSkillProps } from './skills/types';
import { DisadvantagesManager } from '../disadvantages/disadvantagesManager';
import { Entity } from '../../engine/models/entity/entity';
import { CharacterModel } from '../../engine/models/entity/models/character';

export class Character extends Entity {
  private ctx: CTX;
  protected character: CharacterModel;

  battleManager: BattleManager;
  attributeManager: AttributeManager;
  secondaryAttributes: SecondaryAttributes;
  inventory: Inventory;
  skillManager: SkillManager;
  perkManager: PerkManager;
  disadvantagesManager: DisadvantagesManager;
  doll: Doll;
  tags: TagSystem;
  lore: LoreManager;
  private status: string[] = [];
  private cultures: string[] = [];
  private socialGroups: string[];

  constructor({
    ctx,
    inventoryProps,
    skillProps,
    cultures,
    socialGroups,
    rawStruct,
  }: {
    ctx: CTX;
    inventoryProps?: { [index: number]: Item };
    skillProps?: InputSkillProps[];
    cultures?: string[];
    socialGroups?: string[];
    rawStruct?: string;
  }) {
    super(rawStruct);
    this.character = new CharacterModel(this.store);
    this.attributeManager = new AttributeManager(this.store);

    this.ctx = ctx;
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
    this.disadvantagesManager = new DisadvantagesManager({
      ctx,
      character: this,
      input: {},
    });
    this.tags = new TagSystem({ ctx, owner: this });
    this.cultures = cultures || ['default'];
    this.socialGroups = socialGroups || [];
    this.doll = new Doll({ ctx, character: this });
    this.secondaryAttributes = new SecondaryAttributes({
      ctx,
      character: this,
    });
    this.lore = new LoreManager({ ctx });
    this.battleManager = new BattleManager({ ctx, character: this });
  }

  protected initStore() {
    this.character = new CharacterModel(this.store);
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
    return this.character.getGender();
  }

  setGender(gender: string): Character {
    this.character.setGender(gender);
    return this;
  }

  getSocialStatus(): number {
    return this.character.getSocialStatus();
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

  getRaw() {}

  getCultures(): string[] {
    return this.cultures;
  }

  getSocialGroups(): string[] {
    return this.socialGroups;
  }

  initFromRaw() {}
}
