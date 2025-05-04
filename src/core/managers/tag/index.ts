import _ from 'lodash';
import { CTX } from '../../../types';
import { Tag, TagInput } from './models/tag';
import { Character } from '../../models/characters';
import { ObjectModel } from '../../models/locations/object';
import { Location } from '../../models/locations';
import { Perk } from '../../models/perks/perk';
import { Item } from '../../models/items/item';
import { skillList } from '../../models/characters/skills/models';
import { attrsCodesList } from '../../models/characters/attributes';
import { secondaryAttrsCodesList } from '../../models/characters/secondaryAttributes';

export class TagSystem {
  input: { props: any; target?: Item } | undefined;
  all: { [index: string]: Tag };
  active: { [index: string]: { [index: string]: Tag } };
  nonActive: { [index: string]: { [index: string]: Tag } };
  ctx: CTX;
  owner: Character | Item | ObjectModel | Location | Perk;
  pairedToSystem?: TagSystem;
  //TODO: придумать, что делать со слоями

  constructor({
    ctx,
    input,
    owner,
  }: {
    ctx: CTX;
    input?: { props: any; target?: Item };
    owner: TagSystem['owner'];
  }) {
    this.ctx = ctx;
    this.active = {
      action: {},
      skill: {},
      mod: {},
      perk: {},
      flaw: {},
      usable: {},
      keyword: {},
    };
    this.nonActive = {
      action: {},
      skill: {},
      mod: {},
      perk: {},
      flaw: {},
      usable: {},
      keyword: {},
    };
    this.all = {};
    this.input = input;
    this.owner = owner;
    if (!input) return;
    if (input.props) {
      this.parseInput(input);
    }
  }

  parseInput(input: { props: any; target?: Item }) {
    const { props, target } = input;
    if (typeof props !== 'object') return;
    const allProps: any = [];
    props.forEach((prop: any) => {
      const { type, tags } = prop;
      if (type === 'apply') {
        allProps.push(...tags);
      }
      if (type === 'self') {
        allProps.push(...tags);
      }
    });
    //TODO: пока идем по схеме, что тэги предметов применяются к персонажу, остальное само к себе
    allProps.forEach((tagProps: TagInput) => {
      const newTag = new Tag(tagProps, this.owner, this.ctx);
      this.all[newTag.getId()] = newTag;
      if (newTag.getConditionState()) {
        this.activateTag(newTag);
      } else {
        this.deactivateTag(newTag);
      }
    });
  }

  activateTag(tag: Tag) {
    delete this.nonActive[tag.getType()][tag.getId()];
    this.active[tag.getType()][tag.getId()] = tag;
    if (this.pairedToSystem) {
      this.pairedToSystem.active[tag.getType()][tag.getId()] = tag;
    }
    if (tag.getType() === 'mod') {
      this.addMod(tag);
    }
  }

  deactivateTag(tag: Tag) {
    delete this.active[tag.getType()][tag.getId()];
    this.nonActive[tag.getType()][tag.getId()] = tag;
    if (this.pairedToSystem) {
      delete this.pairedToSystem.active[tag.getType()][tag.getId()];
    }
    if (tag.getType() === 'mod') {
      this.removeMod(tag);
    }
  }

  applyTagSystem(outerTagSystem: TagSystem) {
    outerTagSystem.pairedToSystem = this;
    Object.keys(outerTagSystem.active).forEach(tagType => {
      Object.keys(outerTagSystem.active[tagType]).forEach(tagId => {
        this.active[tagType][tagId] = outerTagSystem.active[tagType][tagId];
      });
    });
  }

  removeTagSystem(outerTagSystem: TagSystem) {
    Object.keys(outerTagSystem.active).forEach(tagType => {
      Object.keys(outerTagSystem.active[tagType]).forEach(tagId => {
        delete this.active[tagType][tagId];
      });
    });
    delete outerTagSystem.pairedToSystem;
  }

  conditionChanged(condition: string) {
    Object.keys(this.all).forEach(tagId => {
      const tag = this.all[tagId];
      if (tag.checkIfHasCondition(condition)) {
        const prevState = tag.getConditionState();
        const state = tag.checkConditions({});
        if (prevState !== state) {
          if (state) {
            this.activateTag(tag);
          } else {
            this.deactivateTag(tag);
          }
        }
      }
    });
  }

  getActiveSkills({ actor }: { actor?: Character }): { [index: string]: Tag } {
    if (!actor) return this.active.skill;
    const result: { [index: string]: Tag } = {};
    Object.keys(this.active.skill).forEach(tagId => {
      const tag = this.active.skill[tagId];
      if (tag.checkConditions({ actor })) {
        result[tagId] = this.active.skill[tagId];
      }
    });
    return result;
  }

  getActiveUsablePerks({ actor }: { actor?: Character }): {
    [index: string]: Tag;
  } {
    if (!actor) return this.active.usable;
    const result: { [index: string]: Tag } = {};
    Object.keys(this.active.usable).forEach(tagId => {
      const tag = this.active.usable[tagId];
      if (tag.checkConditions({ actor })) {
        result[tagId] = this.active.usable[tagId];
      }
    });
    return result;
  }

  getActiveActions({ actor }: { actor?: Character }): { [index: string]: Tag } {
    if (!actor) return this.active.action;
    const result: { [index: string]: Tag } = {};
    Object.keys(this.active.action).forEach(tagId => {
      const tag = this.active.action[tagId];
      if (tag.checkConditions({ actor })) {
        result[tagId] = this.active.action[tagId];
      }
    });
    return result;
  }

  addMod(tag: Tag) {
    const target = tag.getModTarget();
    const type = tag.getModType();
    const owner = this.pairedToSystem?.owner || this.owner;
    if (!(owner instanceof Character)) return;
    if (type === 'attribute') {
      let attr: any = owner.attributeManager.getByCode(
        target as attrsCodesList
      );
      if (!attr) {
        attr = owner.secondaryAttributes.getByCode(
          target as secondaryAttrsCodesList
        );
      }
      attr.modificatorManager.addMod(tag);
    } else if (type === 'skill') {
      owner.skillManager
        .getByCode(target as skillList)
        ?.modificatorManager.addMod(tag);
    }
  }

  removeMod(tag: Tag) {
    const target = tag.getTarget<{
      type: string;
      name: string;
    }>();
    const owner = this.pairedToSystem?.owner || this.owner;
    if (!(owner instanceof Character)) return;
    if (target.type === 'attribute') {
      owner.attributeManager
        .getByCode(target.name as attrsCodesList)
        ?.props.modificatorManager.removeMod(tag);
    } else if (target.type === 'skill') {
      owner.skillManager
        .getByCode(target.name as skillList)
        ?.modificatorManager.removeMod(tag);
    }
  }
}
