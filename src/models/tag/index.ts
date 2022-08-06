import { Item } from '../characters/inventory/item';
import _ from 'lodash';
import { CTX } from '../../types';
import { Tag, TagInput } from './models/tag';
import { Character } from '../characters';
import { ObjectModel } from '../locations/object';
import { Location } from '../locations';

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
      if (prop.apply) {
        allProps.push(...prop.apply);
      }
      if (prop.self) {
        allProps.push(...prop.self);
      }
    });
    //пока идем по схеме, что тэги предметов применяются к персонажу, остальное само к себе
    allProps.forEach((tagProps: TagInput) => {
      const newTag = new Tag(tagProps, this.owner);
      this.all[newTag.getId()] = newTag;
      if (newTag.getConditionState()) {
        this.active[newTag.getType()][newTag.getId()] = newTag;
      } else {
        this.nonActive[newTag.getType()][newTag.getId()] = newTag;
      }
    });
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
        const state = tag.checkConditions();
        if (prevState !== state) {
          if (state) {
            this.active[tag.getType()][tag.getId()] = tag;
            delete this.nonActive[tag.getType()][tag.getId()];
            if (this.pairedToSystem) {
              this.pairedToSystem.active[tag.getType()][tag.getId()] = tag;
            }
          } else {
            this.nonActive[tag.getType()][tag.getId()] = tag;
            delete this.active[tag.getType()][tag.getId()];
            if (this.pairedToSystem) {
              delete this.pairedToSystem.active[tag.getType()][tag.getId()];
            }
          }
        }
      }
    });
  }

  getActiveSkills(): { [index: string]: Tag } {
    return this.active.skill;
  }
}
