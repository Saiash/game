import _ from 'lodash';
import { Item } from '../../models/characters/inventory/item';
import { CTX } from '../../../types';
import { Tag, TagInput } from './models/tag';
import { Character } from '../../models/characters';
import { ObjectModel } from '../../models/locations/object';
import { Location } from '../../models/locations';

export class TagSystem {
  input: { props: any; target?: Item } | undefined;
  all: { [index: string]: Tag };
  active: { [index: string]: { [index: string]: Tag } };
  nonActive: { [index: string]: { [index: string]: Tag } };
  ctx: CTX;
  owner: Character | Item | ObjectModel | Location;
  pairedToSystem?: TagSystem;
  //придумать, что делать со слоями

  constructor({
    ctx,
    input,
    owner,
  }: {
    ctx: CTX;
    input?: { props: any; target?: Item };
    owner: Character | Item | ObjectModel | Location;
  }) {
    this.ctx = ctx;
    this.active = {
      action: {},
      skill: {},
      mod: {},
      perk: {},
      flaw: {},
    };
    this.nonActive = {
      action: {},
      skill: {},
      mod: {},
      perk: {},
      flaw: {},
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
    //пока идем по схеме, что тэги предметов применяются к персонажу, остальное само к себе
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
    const target = tag.getTarget();
    const owner = this.pairedToSystem?.owner || this.owner;
    if (!(owner instanceof Character)) return;
    if (target.type === 'attribute') {
      owner.attributes
        .getByCode(target.name)
        .props.modificatorManager.addMod(tag);
    } else if (target.type === 'skill') {
      owner.skills.getByCode(target.name).modificatorManager.addMod(tag);
    }
  }

  removeMod(tag: Tag) {
    const target = tag.getTarget();
    const owner = this.pairedToSystem?.owner || this.owner;
    if (!(owner instanceof Character)) return;
    if (target.type === 'attribute') {
      owner.attributes
        .getByCode(target.name)
        .props.modificatorManager.removeMod(tag);
    } else if (target.type === 'skill') {
      owner.skills.getByCode(target.name).modificatorManager.removeMod(tag);
    }
  }
}
