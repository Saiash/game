import { Item } from '../characters/inventory/item';
import _ from 'lodash';
import { CTX } from '../../types';

export class TagSystem {
  input: { props: any; item?: Item } | undefined;
  required: tagNode;
  inherited: tagNode;
  applied: tagNode;
  nonAppliedSkillChecks: skillTargets;
  skillsTargets: skillTargets;
  ctx: CTX;
  //придумать, что делать со слоями

  constructor(ctx: CTX, input?: { props: any; item?: Item }) {
    this.ctx = ctx;
    this.required = {};
    this.inherited = {};
    this.applied = {};
    this.skillsTargets = {};
    this.nonAppliedSkillChecks = {};
    this.input = input;
    if (!input) return;
    if (input.props) {
      this.parseInput(input);
    }
  }

  parseInput(input: { props: Tag[]; item?: Item }) {
    const { props, item } = input;
    let result: { [index: string]: any } = {};
    props.forEach(prop => {
      let [key]: any = Object.keys(prop);
      let value: any = prop[key];
      if (key === 'itemSlot') {
        key = item?.getMainSlot();
      } else if (key === 'required') {
        this.required = value;
      } else if (key === 'skillCheck') {
        this.checkKeyForSkills({ props: value, item });
        return;
      }
      if (typeof value !== 'number') {
        value = this.parseInput({ props: value, item });
      } else {
        result[key] = value;
      }
      if (key === 'applied') {
        this.applied = value;
      }
      result[key] = value;
    });
    return result;
  }

  checkKeyForSkills(input: { props: Tag[]; item?: Item }) {
    const { props, item } = input;
    if (!item) return;
    props.forEach(tag => {
      let isApplieble: string[] = [];
      const keys = Object.keys(tag);
      if (tag['conditions']) {
        isApplieble = this.checkConditions({
          conditions: tag['conditions'] as string[],
          item,
        });
      }
      keys.forEach(key => {
        if (key !== 'conditions') {
          this.applySkillCheck({ tag, key, item, isApplieble });
        }
      });
    });
  }

  checkConditions({
    conditions,
    item,
  }: {
    conditions: string[];
    item: Item;
  }): string[] {
    let result: string[] = [];
    conditions.forEach(cond => {
      if (cond === 'locked') {
        if (!item.locked) {
          result.push(cond);
        }
      }
    });
    return result;
  }

  applySkillCheck({
    tag,
    key,
    item,
    isApplieble,
  }: {
    tag: Tag;
    key: string;
    item: Item;
    isApplieble: string[];
  }) {
    const value = tag[key];
    const difficulty = typeof value === 'number' ? value : 0;
    const obj = {
      difficulty,
      source: item,
      slot: item.getMainSlot(),
      conditions: [...isApplieble],
    };
    if (isApplieble.length === 0) {
      if (!this.skillsTargets[key]) this.skillsTargets[key] = [];
      this.skillsTargets[key].push(obj);
    } else {
      if (!this.nonAppliedSkillChecks[key])
        this.nonAppliedSkillChecks[key] = [];
      this.nonAppliedSkillChecks[key].push(obj);
    }
  }

  applyTagSystem(tagSystem: TagSystem) {
    const skills = Object.keys(tagSystem.skillsTargets);
    skills.forEach(skill => {
      if (!this.skillsTargets[skill]) this.skillsTargets[skill] = [];
      this.skillsTargets[skill] = [
        ...this.skillsTargets[skill],
        ...tagSystem.skillsTargets[skill],
      ];
    });
    const applied = Object.keys(tagSystem.applied);
    applied.forEach(zone => {
      if (!this.applied[zone]) {
        this.applied[zone] = { ...tagSystem.applied[zone] };
      } else {
        this.applied[zone] = {
          ...this.applied[zone],
          ...tagSystem.applied[zone],
        };
      }
    });
  }

  removeTagSystem(tagSystem: TagSystem) {
    const skills = Object.keys(tagSystem.skillsTargets);
    skills.forEach(skill => {
      const skillTags = tagSystem.skillsTargets[skill];
      skillTags.forEach(skillTag => {
        const index = this.skillsTargets[skill].findIndex(t => {
          t.source.getId() === skillTag.source.getId();
        });
        this.skillsTargets[skill].splice(index, 1);
        if (this.skillsTargets[skill].length === 0) {
          delete this.skillsTargets[skill];
        }
      });
    });
    const applied = Object.keys(tagSystem.applied);
    applied.forEach(zone => {
      const tags = Object.keys(tagSystem.applied[zone]);
      tags.forEach(tag => {
        const _tag = this.applied[zone];
        delete this.applied[zone][tag];
      });
      if (_.isEmpty(this.applied[zone])) delete this.applied[zone];
    });
  }

  reset() {
    this.required = {};
    this.inherited = {};
    this.applied = {};
    this.skillsTargets = {};
  }

  recalculate() {
    if (!this.input) return;
    this.reset();
    this.parseInput(this.input);
  }

  conditionAdded(condition: string) {
    Object.keys(this.nonAppliedSkillChecks).forEach(skillKey => {
      const skillTargets = this.nonAppliedSkillChecks[skillKey];
      skillTargets.forEach((target, targetIndex) => {
        if (!target.conditions) return;
        const check = this.checkConditions({
          conditions: target.conditions,
          item: target.source,
        });
        if (check.length === 0) {
          if (!this.skillsTargets[skillKey]) this.skillsTargets[skillKey] = [];
          this.skillsTargets[skillKey].push(target);
          this.nonAppliedSkillChecks[skillKey].splice(targetIndex, 1);
          if (this.nonAppliedSkillChecks[skillKey].length === 0) {
            delete this.nonAppliedSkillChecks[skillKey];
          }
        }
      });
    });
  }

  conditionRemoved(condition: string) {
    Object.keys(this.skillsTargets).forEach(skillKey => {
      const skillTargets = this.skillsTargets[skillKey];
      skillTargets.forEach((target, targetIndex) => {
        if (!target.conditions) return;
        const check = this.checkConditions({
          conditions: target.conditions,
          item: target.source,
        });
        if (check.length !== 0) {
          if (!this.nonAppliedSkillChecks[skillKey])
            this.nonAppliedSkillChecks[skillKey] = [];
          this.nonAppliedSkillChecks[skillKey].push(target);
          this.skillsTargets[skillKey].splice(targetIndex, 1);
          if (this.skillsTargets[skillKey].length === 0) {
            delete this.skillsTargets[skillKey];
          }
        }
      });
    });
  }

  renewSkillsOnConditionAdded(tagSystem: TagSystem) {
    const skills = Object.keys(tagSystem.skillsTargets);
    skills.forEach(skill => {
      const skillTags = tagSystem.skillsTargets[skill];
      skillTags.forEach(skillTag => {
        const skills = this.skillsTargets[skill];
        const foundSkill = skills
          ? this.skillsTargets[skill].find(t => {
              t.source.getId() === skillTag.source.getId();
            })
          : null;
        if (!foundSkill) {
          if (!this.skillsTargets[skill]) this.skillsTargets[skill] = [];
          this.skillsTargets[skill].push(skillTag);
        }
      });
    });
  }

  renewSkillsOnConditionRemoved(tagSystem: TagSystem) {
    const skills = Object.keys(this.skillsTargets);
    skills.forEach(skill => {
      const skillTags = this.skillsTargets[skill];
      skillTags.forEach((skillTag, index) => {
        const foundSkill = tagSystem.skillsTargets[skill]?.find(t => {
          t.source.getId() === skillTag.source.getId();
        });
        if (!foundSkill) {
          this.skillsTargets[skill].splice(index, 1);
        }
      });
    });
  }
}

type tagNode = { [index: string]: tagNode };
type Tag = { [index: string]: Tag[] | number | string[] };
type skillTargets = {
  [index: string]: {
    source: Item;
    difficulty: number;
    slot?: number;
    conditions?: string[];
  }[];
};
