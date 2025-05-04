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
  protected character: CharacterModel;

  attributeManager: AttributeManager;
  secondaryAttributes: SecondaryAttributes;
  skillManager: SkillManager;
  inventory: Inventory;
  perkManager: PerkManager;
  disadvantagesManager: DisadvantagesManager;

  doll: Doll;

  constructor(rawStruct?: string) {
    super(rawStruct);

    this.character = new CharacterModel(this.store);
    this.attributeManager = new AttributeManager(this, this.store);
    this.skillManager = new SkillManager(this, this.store);
    this.secondaryAttributes = new SecondaryAttributes();

    this.inventory = new Inventory(this, this.store);

    this.perkManager = new PerkManager(this, this.store);
    this.disadvantagesManager = new DisadvantagesManager(this, this.store);
    this.doll = new Doll(this, this.store);
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

  getRaw() { }

  getCultures(): string[] {
    return this.cultures;
  }

  getSocialGroups(): string[] {
    return this.socialGroups;
  }

  initFromRaw() { }

  getDataToSave() {
    return this.store.getDataToSave();
  }

}
