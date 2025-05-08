import { AttributeManager } from './attributes';
import { SkillManager } from './skills/skillManager';
import { Inventory } from './inventory';
import { PerkManager } from './perk/perkManager';
import { CharacterDoll } from './doll';
import { DisadvantagesManager } from './perk/disadvantagesManager';
import { Entity } from '../../engine/models/entity/entity';
import { CharacterModel } from '../../engine/models/entity/models/character';

export class Character extends Entity {
  protected character: CharacterModel;

  attributeManager: AttributeManager;
  skillManager: SkillManager;
  inventory: Inventory;
  perkManager: PerkManager;
  disadvantagesManager: DisadvantagesManager;
  doll: CharacterDoll;

  constructor(rawStruct?: string) {
    super(rawStruct);

    this.character = new CharacterModel(this.store);
    this.attributeManager = new AttributeManager(this.store);
    this.skillManager = new SkillManager(this, this.store);

    this.perkManager = new PerkManager(this.store);
    this.disadvantagesManager = new DisadvantagesManager(this.store);

    this.doll = new CharacterDoll(this.store, this);
    this.inventory = new Inventory(this.store);
  }

  protected initStore() {
    this.character = new CharacterModel(this.store);
  }

  /**
   * Все действия доступные персонажу с самим собой, локацией и текущей целью
   */
  // getAvaliableActons(): {
  //   [index: string]: Tag[];
  // } {
  //   const result: { [index: string]: Tag[] } = {};
  //   const tags = this.tags.getActiveSkills({});
  //   Object.keys(tags).forEach(tagId => {
  //     if (!result[tags[tagId].getName()]) {
  //       result[tags[tagId].getName()] = [];
  //     }
  //     result[tags[tagId].getName()].push(tags[tagId]);
  //   });

  //   const actionTags = this.tags.getActiveActions({});
  //   Object.keys(actionTags).forEach(tagId => {
  //     if (!result[actionTags[tagId].getName()]) {
  //       result[actionTags[tagId].getName()] = [];
  //     }
  //     result[actionTags[tagId].getName()].push(actionTags[tagId]);
  //   });

  //   if (this.ctx.gameData.playerTarget) {
  //     const targetTags = this.ctx.gameData.playerTarget.getAvaliableActons({
  //       actor: this,
  //     });
  //     Object.keys(targetTags).forEach(targetTypeName => {
  //       if (!result[targetTypeName]) {
  //         result[targetTypeName] = [];
  //       }
  //       result[targetTypeName].push(...targetTags[targetTypeName]);
  //     });
  //   }
  //   return result;
  // }

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

  isLocked(): boolean {
    return false;
  }

  getRaw() { }

  initFromRaw() { }

  getDataToSave() {
    return this.store.getDataToSave();
  }

}
