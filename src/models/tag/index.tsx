import { Item } from '../characters/inventory/item';
import _ from 'lodash';

export class TagSystem {
  required: tagNode;
  inherited: tagNode;
  applied: tagNode;
  skillsTargets: {
    [index: string]: { source: Item; difficulty: number; slot?: number }[];
  };
  //придумать, что делать со слоями

  constructor(input?: { props: any; item?: Item }) {
    this.required = {};
    this.inherited = {};
    this.applied = {};
    this.skillsTargets = {};
    if (!input) return;
    const { props, item } = input;
    if (input.props) {
      this.parseInput(input);
    }
  }

  parseInput(input: { props: Tag; item?: Item }) {
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

  checkKeyForSkills(input: { props: Tag; item?: Item }) {
    const { props, item } = input;
    if (!item) return;
    props.forEach(tag => {
      const [key] = Object.keys(tag);
      if (!this.skillsTargets[key]) this.skillsTargets[key] = [];
      const value = tag[key];
      const difficulty = typeof value === 'number' ? value : 12;
      this.skillsTargets[key].push({
        difficulty,
        source: item,
        slot: item.getMainSlot(),
      });
    });
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
}

type tagNode = { [index: string]: tagNode };
type Tag = { [index: string]: Tag | number }[];
