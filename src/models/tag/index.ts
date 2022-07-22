import { Item } from '../characters/inventory/item';
import _ from 'lodash';
import { CTX } from '../../types';
import e from 'express';
import { Tag } from './models/tag';

export class TagSystem {
  input: { props: any; target?: Item } | undefined;
  required: tagNode;
  inherited: tagNode;
  applied: tagNode;
  nonAppliedSkillChecks: skillTargets;
  skillsTargets: skillTargets;
  ctx: CTX;
  //придумать, что делать со слоями

  constructor(ctx: CTX, input?: { props: any; target?: Item }) {
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

  parseInput(input: { props: any; target?: Item }) {
    const { props, target } = input;
    //Self or Apply =>
    //Actions / Skills / Mods / Attrs / Perks / etc =>
    // Создаем объект каждого тэга
    // Если условия прошли - раскладываем модификаторы по папочкам и создаем ссылку на примененный тэг
    // Если нет - то в другой
    if (props.self) {
      props.self.forEach(tagProps => {
        const newTag = new Tag(tagProps);
      });
    }
    if (props.apply) {
    }

    let result: { [index: string]: any } = {};
    props.forEach(prop => {
      let [key]: any = Object.keys(prop);
      let value: any = prop[key];
      if (key === 'itemSlot') {
        key = target?.getMainSlot();
      } else if (key === 'required') {
        this.required = value;
      } else if (key === 'skillCheck') {
        this.checkKeyForSkills({ props: value, target });
        return;
      }
      if (typeof value !== 'number') {
        value = this.parseInput({ props: value, target });
      } else {
        result[key] = value;
      }
      if (key === 'applySkillsOwner') {
        this.applied = value;
      }
      if (key === 'applySkillsSelf') {
        //
      }
      result[key] = value;
    });
    return result;
  }

  checkKeyForSkills(input: { props: Tag[]; target?: Item }) {
    const { props, target } = input;
    if (!target) return;
    props.forEach(tag => {
      let isApplicable: boolean = true;
      const keys = Object.keys(tag);
      if (tag.conditions) {
        [isApplicable] = this.checkConditions({
          conditions: tag.conditions as Condition[],
          target,
        });
      }
      this.applySkillCheck({
        difficulty: tag.difficulty as number,
        skillName: tag.name as string,
        target,
        conditions: tag.conditions as Condition[],
        isApplicable,
      });
    });
  }

  checkConditions({
    conditions,
    target,
  }: {
    conditions?: Condition[];
    target: Item;
  }): boolean[] {
    let result: boolean[] = [];
    if (!conditions) return [true];

    conditions.forEach(cond => {
      const condKeys = Object.keys(cond);
      condKeys.forEach(key => {
        if (key === 'and') {
          const localResults = this.checkConditions({
            conditions: cond[key],
            target,
          });
          result.push(localResults.every(r => r === true));
        } else if (key === 'or') {
          const localResults = this.checkConditions({
            conditions: cond[key],
            target,
          });
          result.push(localResults.some(r => r === true));
        } else {
          if (key === 'status') {
            cond[key]?.forEach(arg => {
              if (arg === 'locked') {
                result.push(target.isLocked());
              } else {
                result.push(target.hasStatus(arg));
              }
            });
          }
        }
      });
    });
    return result;
  }

  checkCondition() {
    return true;
  }

  applySkillCheck({
    difficulty,
    skillName,
    target,
    conditions,
    isApplicable,
  }: {
    difficulty: number;
    skillName: string;
    target: Item;
    conditions: Condition[];
    isApplicable: boolean;
  }) {
    const obj = {
      difficulty,
      source: target,
      conditions,
      slot: target.getMainSlot(),
    };
    if (isApplicable) {
      if (!this.skillsTargets[skillName]) this.skillsTargets[skillName] = [];
      this.skillsTargets[skillName].push(obj);
    } else {
      if (!this.nonAppliedSkillChecks[skillName])
        this.nonAppliedSkillChecks[skillName] = [];
      this.nonAppliedSkillChecks[skillName].push(obj);
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
        //TODO: можно проверять на наличие condition и пропускать все, где оно не используется
        const [isApplicable] = this.checkConditions({
          conditions: target.conditions,
          target: target.source,
        });
        if (isApplicable) {
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
        //TODO: можно проверять на наличие condition и пропускать все, где оно не используется
        const [isApplicable] = this.checkConditions({
          conditions: [] as Condition[],
          target: target.source,
        });
        if (!isApplicable) {
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
type Tag = {
  [index: string]: Tag[] | number | string[] | Condition[] | string;
};
type skillTargets = {
  [index: string]: {
    source: Item;
    difficulty: number;
    slot?: number;
    conditions?: Condition[];
  }[];
};

type Condition = {
  and?: Condition[];
  or?: Condition[];
  status?: string[];
  [index: string]: Object[] | string[] | Condition[] | undefined;
};
